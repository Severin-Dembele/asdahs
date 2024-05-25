import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ChurchController } from 'src/controllers/church.controller';
import { PrismaModule } from 'src/infrastructure/config/prisma/prisma.module';
import { ChurchService } from 'src/repositories/church.service';
import * as path from 'path';
import { UsersService } from 'src/repositories/users.service';

@Module({
  controllers: [ChurchController],
  providers: [ChurchService, UsersService],
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
})
export class ChurchModule {}
