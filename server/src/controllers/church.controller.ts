import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { UpdateChurchDto } from 'src/domain/dto/church/update-church.dto';
import { ChurchService } from 'src/repositories/church.service';
import { UsersService } from 'src/repositories/users.service';

@Controller()
export class ChurchController {
  constructor(
    private readonly churchService: ChurchService,
    private readonly userService: UsersService,
  ) {}

  @Post('conferences/:id/churches')
  create(@Param('id') id: number, @Body() createChurchDto) {
    return this.churchService.create(id, createChurchDto);
  }

  @Post('churches/:id/users')
  @UseInterceptors(FileInterceptor('profile'))
  @ApiConsumes('multipart/form-data')
  createUser(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() userDto,
  ) {
    userDto.profile = file ? file.filename : null;
    return this.userService.create(id, userDto);
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
