import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AllConfig } from '@libs/config';

import { MailSenderService } from './mail-sender.service';

@Module({
  providers: [MailSenderService],
  exports: [MailSenderService],
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<AllConfig>) => ({
        defaults: {
          from: config.getOrThrow('mail.defaultFrom', { infer: true }),
        },
        transport: {
          service: 'SendGrid',
          auth: {
            user: 'apikey',
            pass: config.getOrThrow('mail.sendGridApiKey', { infer: true }),
          },
        },
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),
  ],
})
export class MailSenderModule {}
