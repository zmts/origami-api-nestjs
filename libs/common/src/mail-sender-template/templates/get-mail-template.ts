export enum TemplatesEnum {
  test = 'test',
  welcome = 'welcome',
}

type TemplateContextMap = {
  [TemplatesEnum.test]: TestContextType;
  [TemplatesEnum.welcome]: WelcomeContextType;
};

type TestContextType = {
  username: string;
  content: string;
};

type WelcomeContextType = {
  welcome: string;
  content: string;
};

/**
 * const mailData = getMailTemplate(TemplatesEnum.test, { username: 'Alex', content: 'Hello World' });
 * now you cant use type safe values
 * mailData.templateName;
 * mailData.context.content;
 * mailData.context.username;
 */
export function getMailTemplate<T extends TemplatesEnum>(
  templateName: T,
  templateContext: TemplateContextMap[T],
): { templateName: TemplatesEnum; context: TemplateContextMap[T] } {
  return { templateName, context: templateContext };
}
