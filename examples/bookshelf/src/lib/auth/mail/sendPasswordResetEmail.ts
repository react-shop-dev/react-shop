import { HOST_URL, MAIL_FROM } from '@/lib/constants';
import { escapedHost } from '@/lib/utils/escapedHost';
import { resend } from '@/mail.config';
import { AUHT_ROUTES } from '../routes';
import { createTemplate } from './createTemplate';
import type { EmailSendAction } from '@/types/auth';

export const sendPasswordResetEmail: EmailSendAction = async (
  identifier,
  token,
  host = HOST_URL,
) => {
  const url = `${escapedHost(host)}${AUHT_ROUTES.newPassword}?token=${token}&email=${identifier}`;

  await resend.emails.send({
    from: MAIL_FROM,
    to: identifier,
    subject: 'Password Change Request',
    html: createTemplate`<tr>
      <td align="center" style="padding: 10px 0px; font-family: Helvetica, Arial, sans-serif;">
        <p style="font-size: 18px;">You have submitted a password change request.</p>
      </td>
      </tr>
      ${url} ${'Reset your password'}`,
  });
};
