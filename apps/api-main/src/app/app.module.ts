import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GlobalExceptionProvider } from '@libs/common/api';
import { AllConfig, appConfig, authConfig, databaseConfig } from '@libs/config';
import { DatabaseModule } from '@libs/database';
import { GoogleAuthModule } from '@libs/units/auth-google';

import { AppController } from './app.controller';
import { AuthModule } from './auth';
import { PostsModule } from './posts';
import { TagsModule } from './tags';
import { UsersModule } from './users';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig],
    }),
    GoogleAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AllConfig>) => ({
        clientID: config.getOrThrow('auth.google.clientId', { infer: true }),
        clientSecret: config.getOrThrow('auth.google.secret', { infer: true }),
        callbackURL: config.getOrThrow('auth.google.callbackUrl', { infer: true }),
        frontRedirectURL: config.getOrThrow('auth.google.frontRedirectURL', { infer: true }),
      }),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PostsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [GlobalExceptionProvider],
})
export class AppModule {}
