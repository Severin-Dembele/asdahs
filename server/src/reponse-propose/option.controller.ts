import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateReponseProposeDto } from './dto/update-option.dto';
import { OptionService } from './option.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('responses-proposed')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  /* create(@Body() createReponsePropose: CreateReponseProposeDto) {
    return this.reponseProposeService.createReponse(createReponsePropose);
  }*/

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.optionService.findAll();
  }

  @Put(':id')
  @UseInterceptors(NoFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() updateReponseProposeDto: UpdateReponseProposeDto,
  ) {
    return this.optionService.update(+id, updateReponseProposeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionService.remove(+id);
  }
}
