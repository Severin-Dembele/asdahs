import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Put,
  NotFoundException,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../repositories/users.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { AuthGuard } from '../repositories/auth/auth.guard';
import { FormulaireInvestigatorService } from '../repositories/formulaireInvestigator.service';
import { AuthService } from '../repositories/auth/auth.service';
import { MailsService } from '../mails/mails.service';
import generator from 'generate-password-ts';
import { FormulairesService } from 'src/repositories/formulaires.service';
import { Prisma } from '@prisma/client';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly formulaireInvestigatorService: FormulaireInvestigatorService,
    private readonly authService: AuthService,
    private readonly mailService: MailsService,
    private readonly formulaireService: FormulairesService,
  ) { }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('profile'))
  @ApiConsumes('multipart/form-data')
  async createUser(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() userDto,
    @Req() request: Request,
  ) {
    try {
      userDto.profile = file ? file.filename : null;
      userDto.email = userDto.email ? userDto.email : null;
      const authToken = request.headers['authorization'].split(' ')[1];
      const data = await this.authService.decodeToken(authToken);
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const password = generator.generate({
        length: 8,
        lowercase: true,
        uppercase: true,
        numbers: true,
      });
      userDto.password = password;
      if (userDto.role == 'RESPONDENT') {
        const userConnected = await this.usersService.findOne(
          parseInt(data.sub),
        );
        userDto.userConnected = userConnected.email;
      }
      const user = await this.usersService.create(userDto);
      if (user.role == 'RESPONDENT' && userDto.selfResponse == 'true') {
        const token = await this.authService.generateAccessTokenRespondant(
          user.id,
          user.email,
        );

        if (emailPattern.test(user.email)) {
          await this.mailService.sendMailAcceptToAnswer(
            user.email,
            token,
            process.env.SERVER_FRONT_URL_ANSWER_FORM,
          );
        }
        if (user?.telephone) {
          await this.mailService.sendWhatsappAcceptToAnswer(
            user.telephone,
            token
          );
        }


      } else if (user.role == 'INVESTIGATOR') {
        await this.mailService.sendMailPasswordToUser(
          user.email,
          userDto.password,
        );
      }
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            userDto.email + ' already exists',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  }

  @Get('/reponses')
  async findReponsesUsersConnected(@Req() request: Request) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const userConnected = await this.usersService.findOne(parseInt(data.sub));
    return this.usersService.findAllReponseUsers('' + userConnected.id);
  }

  @Post(':userId/formulaires')
  @UseInterceptors(NoFilesInterceptor())
  async assignFormToInvestigator(
    @Param('userId') userId: number,
    @Body() formulaireInvestigatorDto,
  ) {
    //  console.log(formulaireInvestigatorDto);
    const data = [];
    const lienFormation = '';
    const user = await this.usersService.findOne(userId);
    formulaireInvestigatorDto.map(async (item) => {
      const token = await this.authService.tokenFormulaire(item.formulaireId);
      await this.mailService.sendMailInvestigator(user.email, token);
      //lienFormation = token;
      console.log(lienFormation);
      data.push({
        formulaireId: item,
        userId: userId,
      });
    });

    const formulaireData =
      await this.formulaireInvestigatorService.createList(data);
    return formulaireData;

    //return this.formulaireInvestigatorService.create(userId, formulaireInvestigatorDto);
  }

  @Put('/accept-answer')
  async acceptResponse(@Req() request: Request, @Body() userResponse) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const user = await this.usersService.findOne(parseInt(data.sub));
    const formulaire = await this.formulaireService.getFormulaireByLangage(
      user.langage,
    );
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (user == null) {
      throw new NotFoundException('User not found');
    }
    const token = await this.authService.generateAccessTokenRespondant(
      user.id,
      user.email,
    );
    if (emailPattern.test(user?.email)) {
      await this.mailService.sendMailFormulaireRespondent(
        user.email,
        token,
        process.env.SERVER_FRONT_URL,
        formulaire.uuid,
      );
    }
    if (user?.email) {
      await this.mailService.sendWhatsappFormulaireRespondent(
        user.telephone,
        token,
      );
    }

    return this.usersService.acceptToAnswer(data.sub, userResponse);
  }

  @Get(':userId/formulaires')
  findFormInvestigator(@Param('userId') userId: number) {
    return this.formulaireInvestigatorService.findFormInvestigator(userId);
  }

  @Get('/formulaires')
  async fincFormInvestigatorUsersConnected(@Req() request: Request) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    return this.formulaireInvestigatorService.findFormInvestigator(data.sub);
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Post('test')
  // test(@UploadedFile() file: Express.Multer.File, @Body() data) {
  //   console.log(file);
  //   console.log(data);
  // }

  async test() {
    return `Test`

  }

  @UseGuards(AuthGuard)
  @Get()
  findAllUsers() {
    return this.usersService.findAllUniqueNameUser();
  }

  @UseGuards(AuthGuard)
  @Get('/list')
  async findAll(@Req() request: Request) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const userConnected = await this.usersService.findOne(parseInt(data.sub));
    if (userConnected.role == 'ADMIN') return this.usersService.findAll();
    return this.usersService.findByUserCreated(userConnected.email);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('profile'))
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto,
  ) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    updateUserDto.profile = file ? file.filename : null;
    if (updateUserDto.role == 'RESPONDENT' && updateUserDto.email != null) {
      const token = await this.authService.generateAccessTokenRespondant(
        id,
        updateUserDto.email,
      );
      if (emailPattern.test(updateUserDto.email)) {
        await this.mailService.sendMailAcceptToAnswer(
          updateUserDto.email,
          token,
          process.env.SERVER_FRONT_URL_ANSWER_FORM,
        );
      }
      if (updateUserDto?.telephone) {
        await this.mailService.sendWhatsappAcceptToAnswer(
          updateUserDto.telephone,
          token,
        );
      }

    }
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':id/reponses')
  findReponsesUsers(@Param('id') id: string) {
    return this.usersService.findAllReponseUsers(id);
  }

  @Post('/forget-password')
  async forgetPassword(@Body() data) {
    const email = data.email;

    const user = await this.usersService.findByUsername(email);
    if (user == null) {
      throw new HttpException('User not exist ', HttpStatus.NOT_FOUND);
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpire = new Date();
    otpExpire.setHours(otpExpire.getHours() + 23);
    await this.usersService.updateOtpAndOtpExpire(otp, otpExpire, email);
    return this.mailService.sendMailForResetPassword(email, otp);
  }

  @Post('/reset-password')
  async resetPassword(@Body() data) {
    const password = data.password;
    const otp = data.otp;
    const user = await this.usersService.findUserByOtp(otp);
    if (user == null) {
      throw new HttpException('Invalid or expired OTP', 400);
    }
    return this.usersService.updatePassword(user.id, password);
  }

  @Put(':userId/status')
  async updateStatus(@Param('userId') userId: number) {
    return this.usersService.updateStatusInProgress(userId);
  }

  @UseGuards(AuthGuard)
  @Put('/status')
  async updateStatusUserConnected(@Req() request: Request) {
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const user = await this.usersService.findOne(parseInt(data.sub));
    if (user == null) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    await this.usersService.updateStatusInProgress(user.id);
  }
}
