import { object, string } from 'yup';
import { emailSchema } from './email';
import { passwordSchema } from './password';

export const userSchema = emailSchema.concat(passwordSchema).concat(
  object().shape({
    first_name: string(),
    last_name: string(),
  }),
);
