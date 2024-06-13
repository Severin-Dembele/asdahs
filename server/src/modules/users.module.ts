import { Module } from '@nestjs/common';
import { UsersService } from '../repositories/users.service';
import { UsersController } from '../controllers/users.controller';
import { PrismaModule } from '../infrastructure/config/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { AuthService } from '../repositories/auth/auth.service';
import { FormulaireInvestigatorService } from '../repositories/formulaireInvestigator.service';
import { MailsService } from 'src/mails/mails.service';
import { FormulairesService } from 'src/repositories/formulaires.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    FormulaireInvestigatorService,
    FormulairesService,
    MailsService,
  ],
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/users',
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
            `user_image_${randomName}${path.extname(file.originalname)}`,
          );
        },
      }),
    }),
  ],
  exports: [UsersService, MailsService],
})
export class UsersModule {}
