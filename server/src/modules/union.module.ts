import { Module } from '@nestjs/common';
import { UnionController } from 'src/controllers/union.controller';
import { PrismaModule } from 'src/infrastructure/config/prisma/prisma.module';
import { UnionService } from 'src/repositories/union.service';

@Module({
  controllers: [UnionController],
  providers: [UnionService],
  imports: [PrismaModule],
})
export class UnionModule {}
