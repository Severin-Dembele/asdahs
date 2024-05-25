import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ReponseReponduService } from './reponse-repondu.service';
import { UpdateReponseReponduDto } from './dto/update-reponse-repondu.dto';
import { ApiTags } from '@nestjs/swagger';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('responses')
@ApiTags('Responses')
export class ReponseReponduController {
  constructor(private readonly reponseReponduService: ReponseReponduService) {}

  @Get()
  findAll() {
    return this.reponseReponduService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reponseReponduService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(NoFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() updateReponseReponduDto: UpdateReponseReponduDto,
  ) {
    return this.reponseReponduService.update(+id, updateReponseReponduDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reponseReponduService.remove(+id);
  }
}
