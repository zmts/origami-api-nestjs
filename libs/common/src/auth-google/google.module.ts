import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './google.module-definition';
import { GoogleAuthStrategy } from './google.strategy';

@Module({
  providers: [GoogleAuthStrategy],
})
export class GoogleAuthModule extends ConfigurableModuleClass {}
