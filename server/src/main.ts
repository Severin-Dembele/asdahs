import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './infrastructure/exceptions/http-exception.filter';

import helmet from 'helmet';
import * as express from 'express';
import { join } from 'path';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { TokenExceptionFilter } from './infrastructure/exceptions/token-exception.filter';
import { LoggingInterceptor } from './infrastructure/logger/logging.interceptor';
import { WinstonModule } from 'nest-winston';
import { Logging } from './infrastructure/logger/logging';

async function bootstrap() {
  const loggerService = new Logging();
  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerService.createLoggerConfig),
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new TokenExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  app.use(helmet.originAgentCluster());
  app.use(helmet.crossOriginOpenerPolicy());
  app.use(
    '/uploads/users',
    express.static(join(__dirname, '..', 'uploads', 'users')),
  );
  app.use(
    '/uploads/partners',
    express.static(join(__dirname, '..', 'uploads', 'partners')),
  );
  app.use(
    '/uploads/actualites',
    express.static(join(__dirname, '..', 'uploads', 'actualites')),
  );
  app.use(
    '/uploads/societes',
    express.static(join(__dirname, '..', 'uploads', 'societes')),
  );
  app.use(
    '/uploads/testimonies',
    express.static(join(__dirname, '..', 'uploads', 'testimonies')),
  );
  app.use(
    '/uploads/devis',
    express.static(join(__dirname, '..', 'uploads', 'devis')),
  );
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  //app.use(csurf());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(`port: ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
