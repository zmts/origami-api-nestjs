# MailSenderModule
Module for sending mail via SendGrid templateId

## Define module

```ts
import { MailSenderModule, SenderServiceOptions } from '@libs/common/mail-sender-template-id';

@Module({
  imports: [
    MailSenderModule.forRootAsync({
      useFactory: (confService: ConfigService<AllConfig>): SenderServiceOptions => {
        const { defaultFrom, sendGridApiKey } = confService.get('mail', { infer: true });
        return {
          defaultFrom,
          emailProviderApiKey: sendGridApiKey,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [GetUsersAction],
})
export class AppModule {}
```

## Use MailSenderService in bussines logic (with getMailContext)

```ts
const {
  code,
  codeLifetimeMin
} = getMailContext(MailTemplateEnum.verificationCode, { code: '1234', codeLifetimeMin: '15' });

await this.mailSenderService.send([
  {
    templateId: 'd-396b1801c1d24e16abee16632e9e838e',
    subject: 'Test invite',
    to: 'alex@gmail.com',
    context: {
      code,
      codeLifetimeMin,
    },
  },
]);
```

## Use MailSenderService in bussines logic (direct use without getMailContext)

```ts

await this.mailSenderService.send([
  {
    templateId: 'd-396b1801c1d24e16abee16632e9e838e',
    subject: 'Test invite',
    to: 'alex@gmail.com',
    context: {
      code: '1234',
      codeLifetimeMin: '15',
    },
  },
]);
```
