import { Injectable, Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

interface ISendTemplateOptions {
  to: Array<`${string}@${string}`> | `${string}@${string}`; // alex@gmail.com || [alex@gmail.com]
  subject: string;
  html?: string;
}

@Injectable()
export class MailSenderService {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly mailService: MailerService) {}

  async sendMail(
    template: string,
    options: ISendTemplateOptions,
    context?: { [key: string]: string | number },
  ): Promise<{ messageId: string }> {
    const { to, subject } = options;
    const hasContent = Object.keys(context).length || options.html?.length;

    if (!hasContent) {
      throw new InternalServerErrorException(`Send mail ${subject} to ${to} failed. No content`);
    }

    try {
      const sendParams: ISendMailOptions = options.html ? { to, subject, html: options.html } : { to, subject, context, template };
      const result = await this.mailService.sendMail(sendParams);
      this.logger.log(`sendMail; subject: ${subject}; to: ${to}`);
      return result;
    } catch (e: unknown) {
      this.logger.log(`sendMail; subject: ${subject}; to: ${to} failed: ${e}`);
      if (e && typeof e === 'object') {
        if ('message' in e) this.logger.log(e.message);
        if ('stack' in e) this.logger.log(e.stack);
      }
      throw new InternalServerErrorException(`Send mail ${subject} to ${to} failed`);
    }
  }
}
