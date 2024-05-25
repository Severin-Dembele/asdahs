import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags } from '@nestjs/swagger';
import { OptionService } from '../reponse-propose/option.service';
import { ReponseReponduService } from '../reponse-repondu/reponse-repondu.service';

@Controller('questions')
@ApiTags('Questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private optionService: OptionService,
    private readonly responseService: ReponseReponduService,
  ) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }
  @Post(':idQuestion/responses-proposed')
  createReponsePropose(
    @Param('idQuestion') idQuestion: number,
    @Body() createReponsePropose,
  ) {
    return this.optionService.create(createReponsePropose, idQuestion);
  }

  @Post(':idQuestion/responses')
  createReponseRepondu(
    @Param('idQuestion') idQuestion: number,
    @Body() createReponseRepondu,
  ) {
    return this.responseService.create(idQuestion, createReponseRepondu);
  }

  @Get(':idQuestion/responses-proposed')
  getReponseProposeByQuestionId(@Param('idQuestion') idQuestion: number) {
    return this.optionService.findByQuestionId(idQuestion);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
