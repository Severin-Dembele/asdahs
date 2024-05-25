import { Module } from '@nestjs/common';
import { ConferenceController } from 'src/controllers/conference.controller';
import { PrismaModule } from 'src/infrastructure/config/prisma/prisma.module';
import { ConferenceService } from 'src/repositories/conference.service';

@Module({
  controllers: [ConferenceController],
  providers: [ConferenceService],
  imports: [PrismaModule],
})
export class ConferenceModule {}
