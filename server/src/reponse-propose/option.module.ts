import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { PrismaModule } from '../infrastructure/config/prisma/prisma.module';

@Module({
  controllers: [OptionController],
  providers: [OptionService],
  imports: [PrismaModule],
})
export class OptionModule {}
