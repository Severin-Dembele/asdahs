import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaModule } from '../infrastructure/config/prisma/prisma.module';
import { ReponseReponduService } from '../reponse-repondu/reponse-repondu.service';
import { OptionService } from '../reponse-propose/option.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, ReponseReponduService, OptionService],
  imports: [PrismaModule],
})
export class QuestionModule {}
