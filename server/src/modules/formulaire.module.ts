import { Module } from '@nestjs/common';
import { FormulaireController } from '../controllers/formulaire.controller';
import { FormulairesService } from '../repositories/formulaires.service';
import { PrismaModule } from '../infrastructure/config/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { QuestionService } from '../question/question.service';
import { OptionService } from '../reponse-propose/option.service';
import { ReponseReponduService } from '../reponse-repondu/reponse-repondu.service';
import { AuthModule } from './auth/auth.module';
import { SectionService } from '../section/section.service';

@Module({
  controllers: [FormulaireController],
  providers: [
    FormulairesService,
    QuestionService,
    OptionService,
    ReponseReponduService,
    SectionService,
  ],
  imports: [
    AuthModule,
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/formulaires',
        filename(
          req,
          file,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(
            null,
            `formulaire_${randomName}${path.extname(file.originalname)}`,
          );
        },
      }),
    }),
  ],
})
export class FormulaireModule {}
