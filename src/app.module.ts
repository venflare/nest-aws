import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities';
import { UserSubscriber } from './users/subscribers';
import { UsersModule } from './users/users.module';
import { ExceptionFilter } from './core/exception.filter';
import { LoggerModule } from './core/logger/logger.module';
import { AuthenticationModule } from './core/authentication/authentication.module';
import { SeederModule } from './core/util/seeder/seeder.module';
import { Policy } from './policies/entities';
import { PoliciesModule } from './policies/policies.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.production',
      // envFilePath: '.env.local',
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Policy],
        subscribers: [UserSubscriber],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    LoggerModule,
    AuthenticationModule,
    SeederModule,
    UsersModule,
    PoliciesModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: ExceptionFilter }],
})
export class AppModule {}
