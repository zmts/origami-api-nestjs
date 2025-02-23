import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { IsString, Matches } from 'class-validator';

import { validateConfig } from '@libs/config/validate-config';

import { RabbitMQConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @Matches(/^amqp:\/\/.*/, { message: 'Value must start with amqp://' })
  RABBITMQ_URL: string;
}

export default registerAs<RabbitMQConfig>('rabbitmq', (): RabbitMQConfig => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queueOptions: {
        durable: false,
      },
    },
  };
});
