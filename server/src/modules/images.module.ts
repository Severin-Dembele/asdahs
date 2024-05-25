import { Module } from '@nestjs/common';
import { ImagesController } from '../controllers/images.controller';
import { AuthService } from '../repositories/auth/auth.service';
import {UsersModule} from "./users.module";

@Module({
  controllers: [ImagesController],
  providers: [AuthService],
  imports: [UsersModule],
})
export class ImagesModule {}
