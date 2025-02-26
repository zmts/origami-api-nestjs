import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { IsString, Matches } from 'class-validator';

import { validateConfig } from '@libs/config/validate-config';

import { IRabbitMQConfig } from './types';

class EnvironmentVariablesValidator {
  @IsString()
  @Matches(/^amqp:\/\/.*/, { message: 'Value must start with amqp://' })
  RABBITMQ_URL: string;
}

export const TOKEN = 'rabbitmq';

export default registerAs<IRabbitMQConfig>(TOKEN, (): IRabbitMQConfig => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queueOptions: { durable: true },
    },
  };
});
