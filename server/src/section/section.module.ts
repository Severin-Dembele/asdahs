import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import {PrismaModule} from "../infrastructure/config/prisma/prisma.module";
import {QuestionService} from "../question/question.service";

@Module({
  controllers: [SectionController],
  providers: [SectionService, QuestionService],
  imports: [PrismaModule]
})
export class SectionModule {}
