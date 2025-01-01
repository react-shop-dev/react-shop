import { useTranslate } from '../../i18n/useTranslate';
import { ValidationErrorMessage, ValidationErrorMessageWithArgs } from './types';

export const useGetValidationErrorMessage = () => {
  const translate = useTranslate();

  return (error: ValidationErrorMessage) => {
    if ((error as ValidationErrorMessageWithArgs).message != null) {
      const { message, args } = error as ValidationErrorMessageWithArgs;
      return translate(message, { _: message, ...args });
    }
    return translate(error as string, { _: error });
  };
};
