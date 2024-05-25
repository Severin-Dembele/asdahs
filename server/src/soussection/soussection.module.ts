import { Module } from '@nestjs/common';
import { SoussectionService } from './soussection.service';
import { SoussectionController } from './soussection.controller';
import {PrismaModule} from "../infrastructure/config/prisma/prisma.module";
import {QuestionService} from "../question/question.service";

@Module({
  controllers: [SoussectionController],
  providers: [SoussectionService, QuestionService],
  imports: [PrismaModule]
})
export class SoussectionModule {}
