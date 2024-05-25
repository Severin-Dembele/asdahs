import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDivisionDto } from 'src/domain/dto/divisions/create-division.dto';
import { UpdateDivisionDto } from 'src/domain/dto/divisions/update-division.dto';
import { DivisionService } from 'src/repositories/division.service';

@Controller('divisions')
@ApiTags('divisions')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  create(@Body() divisionDto) {
    return this.divisionService.create(divisionDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDivisionDto: UpdateDivisionDto,
  ) {
    return this.divisionService.update(id, updateDivisionDto);
  }

  @Get()
  findAll() {
    return this.divisionService.findAll();
  }

  @Delete(':id')
  deleteDivision(@Param('id', ParseIntPipe) id: number){
    return this.divisionService.delete(id);
  }
}
