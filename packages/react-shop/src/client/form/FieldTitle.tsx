import { ReactElement, memo } from 'react';
import { useTranslate } from '../i18n';

export interface FieldTitleProps {
  isRequired?: boolean;
  label?: ReactElement | string | boolean;
}

export const FieldTitle = memo((props: FieldTitleProps) => {
  const { label, isRequired } = props;

  const translate = useTranslate();

  if (label === true) {
    throw new Error('Label parameter must be a string, a ReactElement or false');
  }

  if (label === false || label === '') {
    return null;
  }

  if (label && typeof label !== 'string') {
    return label;
  }

  return (
    <span>
      {translate(label as string, { _: label })}
      {isRequired && <span aria-hidden="true">&thinsp;*</span>}
    </span>
  );
});

FieldTitle.displayName = 'FieldTitle';
