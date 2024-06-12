import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaModule } from 'src/infrastructure/config/prisma/prisma.module';
import { AuthService } from 'src/repositories/auth/auth.service';
import { UsersService } from 'src/repositories/users.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, AuthService, UsersService],
  imports: [DashboardModule, PrismaModule],
})
export class DashboardModule {}
