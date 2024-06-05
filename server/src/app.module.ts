import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { PrismaService } from './repositories/prisma/prisma.service';
import { UsersModule } from './modules/users.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './infrastructure/exceptions/http-exception.filter';
import { AuthService } from './repositories/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { ImagesModule } from './modules/images.module';
import { ConfigModule } from '@nestjs/config';
import { FormulaireModule } from './modules/formulaire.module';
import { QuestionModule } from './question/question.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { OptionModule } from './reponse-propose/option.module';
import { ReponseReponduModule } from './reponse-repondu/reponse-repondu.module';
import { SectionModule } from './section/section.module';
import { SoussectionModule } from './soussection/soussection.module';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DivisionModule } from './modules/division.module';
import { UnionModule } from './modules/union.module';
import { ChurchModule } from './modules/church.module';
import { ConferenceModule } from './modules/conference.module';

@Module({
  imports: [
    LoggerModule,
    MorganModule,
    ExceptionsModule,
    UsersModule,
    FormulaireModule,
    AuthModule,
    ImagesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QuestionModule,
    OptionModule,
    ReponseReponduModule,
    SectionModule,
    SoussectionModule,
    DivisionModule,
    UnionModule,
    ChurchModule,
    ConferenceModule,
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          service: 'gmail',
          secure: false,
          auth: {
            user: process.env.EMAIL,
            pass: 'L162Pv#23',
          },
        },
        defaults: {
          from: process.env.EMAIL,
        },
        template: {
          dir: join(__dirname, 'mails/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EnvironmentConfigService,
    PrismaService,
    AuthService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
