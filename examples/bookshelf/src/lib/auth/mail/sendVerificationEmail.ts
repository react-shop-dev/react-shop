import { HOST_URL, MAIL_FROM } from '@/lib/constants';
import { escapedHost } from '@/lib/utils/escapedHost';
import { resend } from '@/mail.config';
import { AUHT_ROUTES } from '../routes';
import { createTemplate } from './createTemplate';
import type { EmailSendAction } from '@/types/auth';

export const sendVerificationEmail: EmailSendAction = async (
  identifier,
  token,
  host = HOST_URL,
) => {
  const url = `${escapedHost(host)}${AUHT_ROUTES.verification}?token=${token}&email=${identifier}`;

  await resend.emails.send({
    from: MAIL_FROM,
    to: identifier,
    subject: 'Confirm your email',
    html: createTemplate`
      <tr>
        <td align="center" style="padding: 10px 0px; font-family: Helvetica, Arial, sans-serif;">
          <h1 style="font-size: 22px;">Welcome to Bookshelf</h1>
          <p style="font-size: 16px;">Thank you for signing up. Please verify your email address by clicking the following link:</p>
        </td>
      </tr>
      ${url} ${'Sign in'}
      <tr>
        <td align="center" style="padding: 0px 0px 10px 0px; font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; ">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>`,
  });
};
