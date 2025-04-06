import { Inject, Injectable, Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import sendgrig from '@sendgrid/mail';
import { MailService } from '@sendgrid/mail/src/mail';

import { MODULE_OPTIONS_TOKEN } from './token';
import { ISendOptions, SenderServiceOptions } from './types';

@Injectable()
export class MailSenderService {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private readonly options: SenderServiceOptions) {}

  async sendManyByTemplateId(options: ISendOptions[]): Promise<void> {
    const emailData = options.map(({ to, templateId, subject }) => ({ to, templateId, subject }));

    const mailData = this.buildMailData(options);
    try {
      await this.client.send(mailData, true);
      this.logger.log(`Send mails`, emailData);
    } catch (e: unknown) {
      this.logger.error(`Send mail failed`, emailData);
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  private get client(): MailService {
    sendgrig.setApiKey(this.options.emailProviderApiKey);
    return sendgrig;
  }

  private buildMailData(options: ISendOptions[]): MailDataRequired[] {
    return options.map(({ templateId, subject, context, to, from }) => {
      const fromEmail = from || this.options.defaultFrom;

      return {
        templateId,
        to,
        from: fromEmail,
        dynamicTemplateData: { ...(context || {}), subject },
      };
    });
  }
}
