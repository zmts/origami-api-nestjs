import { Module } from '@nestjs/common';

import { LoginEmailAction, LoginGoogleAction } from './actions';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [LoginEmailAction, LoginGoogleAction],
})
export class AuthModule {}
