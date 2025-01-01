import { Resend } from 'resend';

/**
 * @see https://resend.com/docs/api-reference/introduction
 */

export const resend = new Resend(process.env.RESEND_API_KEY);
