import { Module } from '@nestjs/common';
import { AuthController } from '../../controllers/auth/auth.controller';
import { AuthService } from '../../repositories/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../infrastructure/config/auth.constant';
import { UsersModule } from '../users.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
