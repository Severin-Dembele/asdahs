import { Module } from '@nestjs/common';
import { DivisionController } from 'src/controllers/division.controller';
import { PrismaModule } from 'src/infrastructure/config/prisma/prisma.module';
import { DivisionService } from 'src/repositories/division.service';

@Module({
  controllers: [DivisionController],
  providers: [DivisionService],
  imports: [PrismaModule],
})
export class DivisionModule {}
