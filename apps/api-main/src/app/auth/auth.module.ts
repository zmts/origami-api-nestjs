import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { AllConfig } from '@libs/config';
import { UsersRepoModule } from '@libs/datalayer/users';

import { LoginEmailAction, LoginGoogleAction, RegisterAction, SendRegisterEmailAction } from './actions';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    UsersRepoModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>): JwtModuleOptions => ({
        secret: configService.getOrThrow('auth.accessToken.secret', { infer: true }),
        signOptions: {
          algorithm: 'HS512',
          issuer: configService.getOrThrow('app.appName', { infer: true }),
          expiresIn: configService.getOrThrow('auth.accessToken.expiresIn', { infer: true }),
        },
      }),
    }),
  ],
  providers: [LoginEmailAction, LoginGoogleAction, RegisterAction, SendRegisterEmailAction],
})
export class AuthModule {}
