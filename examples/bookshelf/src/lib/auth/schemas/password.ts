import { object, string, ref } from 'yup';

export const passwordSchema = object().shape({
  password: string().required('Please enter your password'),
  // .min(8, 'At least 8 characters')
  // .matches(/\d/, 'Should contain numbers')
  // .matches(/[a-z]/, 'Should contain lowercase letters')
  // .matches(/[A-Z]/, 'Should contain uppercase letters'),
});

export const changePasswordSchema = passwordSchema.concat(
  object({
    confirmPassword: string()
      .oneOf([ref('password'), undefined], 'Passwords must match')
      .required('Please confirm your password'),
  }),
);
