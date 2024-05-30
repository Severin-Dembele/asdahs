import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { UpdateChurchDto } from 'src/domain/dto/church/update-church.dto';
import { MailsService } from 'src/mails/mails.service';
import { AuthService } from 'src/repositories/auth/auth.service';
import { ChurchService } from 'src/repositories/church.service';
import { UsersService } from 'src/repositories/users.service';

@Controller()
export class ChurchController {
  constructor(
    private readonly churchService: ChurchService,
    private readonly userService: UsersService,
    private readonly mailService: MailsService,
    private readonly authService: AuthService,
  ) {}

  @Post('conferences/:id/churches')
  create(@Param('id') id: number, @Body() createChurchDto) {
    return this.churchService.create(id, createChurchDto);
  }

  @Post('churches/:id/users')
  @UseInterceptors(FileInterceptor('profile'))
  @ApiConsumes('multipart/form-data')
  async createUser(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() userDto,
    @Req() request: Request
  ) {
    userDto.profile = file ? file.filename : null;
    const authToken = request.headers['authorization'].split(' ')[1];
    const data = await this.authService.decodeToken(authToken);
    const userConnected = await this.userService.findOne(parseInt(data.sub));
    userDto.userConnected = userConnected.email;
    const user = await this.userService.create(id, userDto);
    if ((user.role = 'RESPONDENT')) {
      const token = await this.authService.generateAccessTokenRespondant(
        user.id,
        user.email,
      );
      await this.mailService.sendMailRespondent(
        user.email,
        token,
        process.env.SERVER_FRONT_URL,
      );
    }
    return user;
  }

  @Get('churches/:id')
  findById(@Param('id') id: number) {
    return this.churchService.findById(id);
  }

  @Get('conferences/:id/churches')
  findByConference(@Param('id') id: number) {
    return this.churchService.findAllByConference(id);
  }

  @Get('churches')
  findAll() {
    return this.churchService.findAll();
  }

  @Put('conferences/:id/churches/:churchId')
  update(
    @Param('id') id: number,
    @Param('churchId') churchId: number,
    @Body() updateChurchDto,
  ) {
    return this.churchService.update(churchId, updateChurchDto);
  }
}
