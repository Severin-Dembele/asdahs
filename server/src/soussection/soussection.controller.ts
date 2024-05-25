import {Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors} from '@nestjs/common';
import { SoussectionService } from './soussection.service';
import { CreateSoussectionDto } from './dto/create-soussection.dto';
import { UpdateSoussectionDto } from './dto/update-soussection.dto';
import {QuestionService} from "../question/question.service";
import {NoFilesInterceptor} from "@nestjs/platform-express";

@Controller('sub-sections')
export class SoussectionController {
  constructor(private readonly soussectionService: SoussectionService,
              private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createSoussectionDto: CreateSoussectionDto) {
    return this.soussectionService.create(createSoussectionDto);
  }

  @Post(':subSectionId/questions')
  @UseInterceptors(NoFilesInterceptor())
  createSousSectionQuestion(@Param('subSectionId') subSectionId:number,
                            @Body() createQuestionDto){
    return this.questionService.createQuestionSousSection(subSectionId, createQuestionDto);
  }

  @Get(':subSectionId/questions')
  findAllQuestionsBySectionId(@Param('subSectionId') subSectionId:number){
    return this.questionService.findQuestionSectionSousSection(subSectionId);
  }

  @Get()
  findAll() {
    return this.soussectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.soussectionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSoussectionDto) {
    return this.soussectionService.update(+id, updateSoussectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.soussectionService.remove(+id);
  }
}
