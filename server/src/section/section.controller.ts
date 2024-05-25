import {Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import {ApiTags} from "@nestjs/swagger";
import {QuestionService} from "../question/question.service";
import {NoFilesInterceptor} from "@nestjs/platform-express";

@Controller('sections')
@ApiTags('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService,
              private questionService: QuestionService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  create(@Body() createSectionDto: CreateSectionDto) {
    //return this.sectionService.create(createSectionDto);
    return "implemented";
  }

  @Post(":sectionId/sub-sections")
  createSousSection(@Param('sectionId') sectionId:number,
      @Body() createSousSectionDto){
    return this.sectionService.createSousSection(sectionId, createSousSectionDto);
  }

  @Post(':sectionId/questions')
  @UseInterceptors(NoFilesInterceptor())
  createQuestion(@Param('sectionId') sectionId:number,
                 @Body() createQuestion){
    return this.questionService.createQuestion(sectionId, createQuestion);
  }

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }

  @Get(':sectionId/sub-sections')
  findAllSubSectionBySectionId(sectionId: number){
    return this.sectionService.findAllSubSectionBySectionId(sectionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(NoFilesInterceptor())
  update(@Param('id') id: string, @Body() updateSectionDto) {
    return this.sectionService.update(+id, updateSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(+id);
  }
}
