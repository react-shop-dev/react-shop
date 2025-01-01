import { useTranslate } from '../i18n';
import { ValidationErrorMessage, ValidationErrorMessageWithArgs } from './validators';
import { safeJSONParse } from '@functions/saveJSONParse';

export interface ValidationErrorProps {
  error: ValidationErrorMessage;
}

const ValidationErrorSpecialFormatPrefix = '@@react-shop@@';

export const ValidationError = (props: ValidationErrorProps) => {
  const { error } = props;
  const translate = useTranslate();

  let errorMessage = error;

  if (typeof error === 'string' && error.startsWith(ValidationErrorSpecialFormatPrefix)) {
    errorMessage = safeJSONParse(error.substring(ValidationErrorSpecialFormatPrefix.length));
  }

  if ((errorMessage as ValidationErrorMessageWithArgs).message) {
    const { message, args } = errorMessage as ValidationErrorMessageWithArgs;

    return <>{translate(message, { _: message, ...args })}</>;
  }

  return <>{translate(errorMessage as string, { _: errorMessage })}</>;
};
