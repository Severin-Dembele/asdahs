import { Module } from '@nestjs/common';
import { ReponseReponduService } from './reponse-repondu.service';
import { ReponseReponduController } from './reponse-repondu.controller';
import { PrismaModule } from '../infrastructure/config/prisma/prisma.module';

@Module({
  controllers: [ReponseReponduController],
  providers: [ReponseReponduService],
  imports: [PrismaModule],
})
export class ReponseReponduModule {}
