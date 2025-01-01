import { InputProps, FieldTitle, ArrayInputChildProps } from 'react-shop';
import InputLabel from '@mui/material/InputLabel';
import clsx from 'clsx';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import styled from '@mui/material/styles/styled';
import { InputHelperText } from '../../input/InputHelperText';

export interface ArrayInputControlProps
  extends Omit<FormControlProps, 'onBlur' | 'onChange' | 'defaultValue' | 'error'>,
    Omit<InputProps, 'source'> {
  isDirty?: boolean;
  source?: string;
  isSubmitted?: boolean;
  error?: ArrayInputChildProps['error'];
}

export const ArrayInputControl = (props: ArrayInputControlProps) => {
  const { source, label, helperText, resource, margin, error, isRequired, className, children } =
    props;

  const renderHelperText = helperText !== false || !!error;

  return (
    <StyledArrayInputControl
      margin={margin}
      className={clsx(`rs-input-${source}`, ArrayInputClasses.root, className)}
      error={!!error}
    >
      {label ? (
        <InputLabel
          shrink
          htmlFor={source}
          resource={resource}
          className={ArrayInputClasses.label}
          error={!!error}
        >
          <FieldTitle label={label} isRequired={isRequired} />
        </InputLabel>
      ) : null}
      {children}
      {renderHelperText ? (
        <FormHelperText error={!!error}>
          <InputHelperText error={error?.root?.message ?? error?.message} helperText={helperText} />
        </FormHelperText>
      ) : null}
    </StyledArrayInputControl>
  );
};

const PREFIX = 'ShopArrayInputControl';

export const ArrayInputClasses = {
  root: `${PREFIX}-root`,
  label: `${PREFIX}-label`,
};

const StyledArrayInputControl = styled(FormControl, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})({
  marginTop: 0,
  [`& .${ArrayInputClasses.label}`]: {},
  [`& .${ArrayInputClasses.root}`]: {},
});
