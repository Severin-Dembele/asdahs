import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TokenexpireException } from './tokenexpire-exception';
import { Response } from 'express';

@Catch(TokenexpireException)
export class TokenExceptionFilter implements ExceptionFilter {
  catch(exception: TokenexpireException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
