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
} from '@nestjs/common';
import { UsersService } from '../repositories/users.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AuthGuard } from '../repositories/auth/auth.guard';
import { FormulaireInvestigatorService } from '../repositories/formulaireInvestigator.service';
import { AuthService } from '../repositories/auth/auth.service';
import { MailsService } from '../mails/mails.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly formulaireInvestigatorService: FormulaireInvestigatorService,
    private readonly authService: AuthService,
    private readonly mailService: MailsService,
  ) {}

  /* @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  create(@UploadedFile() file: Express.Multer.File, @Body() createUserDto) {
    createUserDto.avatar = file ? file.filename : null;
    return this.usersService.create(createUserDto);
  }*/

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
  test(@UploadedFile() file: Express.Multer.File, @Body() data) {
    console.log(file);
    console.log(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllUsers() {
    return this.usersService.findAllUniqueNameUser();
  }

  @UseGuards(AuthGuard)
  @Get('/list')
  findAll() {
    return this.usersService.findAll();
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
  update(
    @Param('id', ParseIntPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto,
  ) {
    updateUserDto.avatar = file ? file.filename : null;
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':userId/reponses')
  findReponsesUsers(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findAllReponseUsers(id);
  }
}
