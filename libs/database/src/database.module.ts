import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitySchema } from 'typeorm';

import { AllConfig } from '@libs/config';

import * as schemas from './schemas';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<AllConfig>) => ({
        type: 'postgres',
        host: config.getOrThrow('database.host', { infer: true }),
        port: config.getOrThrow('database.port', { infer: true }),
        username: config.getOrThrow('database.username', { infer: true }),
        password: config.getOrThrow('database.password', { infer: true }),
        database: config.getOrThrow('database.name', { infer: true }),
        entities: [...Object.values(schemas)],
        synchronize: false,
        logging: true,
        maxQueryExecutionTime: 1000,
      }),
    }),
  ],
})
export class DatabaseModule {
  // eslint-disable-next-line
  static forFeature(entities?: (Function | EntitySchema)[]): DynamicModule {
    return TypeOrmModule.forFeature(entities);
  }
}
