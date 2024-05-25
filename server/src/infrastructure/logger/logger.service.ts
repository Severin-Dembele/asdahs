import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from './logger.interface';

@Injectable()
export class LoggerService extends Logger implements ILogger {
  debug(message: any, context?: string) {
    super.debug(message, context);
  }
  log(message: any, context?: string) {
    super.log(message, context);
  }
  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
  }
  warn(message: any, context?: string) {
    super.warn(message, context);
  }
  verbose(message: any, context?: string) {
    super.verbose(message, context);
  }
}
