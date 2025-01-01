'use client';
import { ReactElement, isValidElement } from 'react';
import { ValidationError } from 'react-shop';
import { useTranslate } from 'react-shop/translate';

export interface InputHelperProps {
  helperText?: ReactElement | string | boolean;
  error?: string;
}

export const InputHelperText = (props: InputHelperProps) => {
  const { helperText, error } = props;

  const translate = useTranslate();

  if (error) {
    return <ValidationError error={error} />;
  }

  if (isValidElement(helperText)) {
    return helperText;
  }

  if (typeof helperText === 'string') {
    return <>{translate(helperText, { _: helperText })}</>;
  }

  const defaultInnerHTML = '&#8203;';

  return helperText !== false ? (
    <span dangerouslySetInnerHTML={{ __html: defaultInnerHTML }} />
  ) : null;
};
