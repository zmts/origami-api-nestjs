/**
 * File must be moved to business logic layer
 */

/**
 * Don't forget to use it in dto validation
 */
export enum MailTemplateEnum {
  test = 'd-133ba20a019045c7928cc2362edc89db',
  verificationCode = 'd-396b1801c1d24e16abee16632e9e838e',
}

type TemplateContextMap = {
  [MailTemplateEnum.test]: TestContextType;
  [MailTemplateEnum.verificationCode]: VerificationCodeContextType;
};

export type TestContextType = {
  username: string;
};

export type VerificationCodeContextType = {
  code: string;
  codeLifetimeMin: string;
};

/**
 * const mailContext = getMailContext(TemplatesEnum.test, { username: 'Alex' });
 * mailContext.username;
 */
export function getMailContext<T extends MailTemplateEnum>(templateName: T, templateContext: TemplateContextMap[T]): TemplateContextMap[T] {
  return templateContext;
}
