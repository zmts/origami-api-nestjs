import { Module } from '@nestjs/common';

import { LoginEmailAction } from './actions';
import { AuthController } from './auth.controller';

@Module({
  providers: [LoginEmailAction],
  controllers: [AuthController],
})
export class AuthModule {}
