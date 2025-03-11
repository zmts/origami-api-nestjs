import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';

import { validateConfig } from '@libs/config/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  KAFKA_URL: string;
}

export const TOKEN = 'kafka';

export default registerAs<{ connectionUrls: string[] }>(TOKEN, (): { connectionUrls: string[] } => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return { connectionUrls: [process.env.KAFKA_URL] };
});
