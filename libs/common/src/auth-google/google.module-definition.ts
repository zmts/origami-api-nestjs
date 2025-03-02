import { ConfigurableModuleBuilder } from '@nestjs/common';

import { GoogleAuthModuleOptions } from './google.types';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN: GOOGLE_AUTH_MODULE_OPTIONS } =
  new ConfigurableModuleBuilder<GoogleAuthModuleOptions>({ moduleName: 'GoogleAuth' }).setClassMethodName('forRoot').build();
