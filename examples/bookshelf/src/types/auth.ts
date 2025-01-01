export interface Token {
  expires: Date;
  email: string;
  token: string;
}

export enum TokenConfirm {
  verificationToken = 'verificationToken',
  passwordResetToken = 'passwordResetToken',
}

export interface VerificationResponse {
  type: 'success' | 'error';
  message: string;
}

export type EmailSendAction = (identifier: string, token: string, host?: string) => Promise<void>;
