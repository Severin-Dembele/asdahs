import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUnionDto } from 'src/domain/dto/unions/update-union.dto';
import { UnionService } from 'src/repositories/union.service';

@Controller()
@ApiTags('unions')
export class UnionController {
  constructor(private unionService: UnionService) {}

  @Post('divisions/:id/unions')
  create(@Param('id') id: number, @Body() createUnionDto) {
    console.log(createUnionDto);
    return this.unionService.create(id, createUnionDto);
  }

  @Put('divisions/:id/unions/:unionId')
  update(
    @Param('id') id: number,
    @Param('unionId') unionId: number,
    @Body() updateUnionDto: UpdateUnionDto,
  ) {
    return this.unionService.update(unionId, updateUnionDto);
  }

  @Get('unions')
  findAll() {
    return this.unionService.findAll();
  }

  @Get('unions/:id')
  findById(@Param('id') id: number) {
    return this.unionService.findById(id);
  }
}
