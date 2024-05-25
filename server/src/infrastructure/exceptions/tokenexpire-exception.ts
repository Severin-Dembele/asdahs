import { UnauthorizedException } from '@nestjs/common';

export class TokenexpireException extends UnauthorizedException {
  constructor(message: string) {
    super(message);
  }
}
