export interface SenderServiceOptions {
  emailProviderApiKey: string; // SENDGRID_API_KEY
  defaultFrom: string;
}

export interface ISendOptions {
  templateId: string;
  to: string;
  subject: string;
  from?: string;
  context?: { [key: string]: string | number };
}
