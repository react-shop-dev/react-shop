import { object, string } from 'yup';

export const emailSchema = object().shape({
  email: string().required('Please enter your email address').email('Please enter valid email'),
});
