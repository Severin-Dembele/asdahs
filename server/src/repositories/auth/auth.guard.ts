import {
  CanActivate,
  ExecutionContext, ForbiddenException, Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      const resp = await this.authService.validateToken(token);
      return true;
    } catch (e) {
      throw new ForbiddenException(
        e.message || 'session expired! Please sign in',
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const { authorization }: any = request.headers;
    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Please provide token');
    }
    const [type, token] = authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
