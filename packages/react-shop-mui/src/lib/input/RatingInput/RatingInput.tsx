import type { SyntheticEvent, ReactElement } from 'react';
import { type Validator, useInput } from 'react-shop';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { RatingField, type RatingFieldProps } from 'src/lib/field/RatingField';
import { InputHelperText } from '../InputHelperText';
import { sanitizeInputRestProps } from '../sanitizeInputRestProps';

export type RatingInputProps = RatingFieldProps & {
  source: string;
  validate?: Validator | Validator[];
  helperText?: ReactElement | string | boolean;
};

export const RatingInput = ({
  source,
  defaultValue,
  helperText,
  validate,
  ...rest
}: RatingInputProps) => {
  const {
    id,
    field,
    fieldState: { error, invalid },
  } = useInput({ source, defaultValue, validate });

  const handleOnChange = (_event: SyntheticEvent, value: number | null) => {
    field.onChange(value);
  };

  const renderHelperText = helperText !== false || invalid;

  return (
    <FormControl>
      <RatingField
        id={id}
        {...field}
        value={Number(field.value)}
        onChange={handleOnChange}
        readOnly={false}
        {...sanitizeInputRestProps(rest)}
      />
      {renderHelperText ? (
        <FormHelperText sx={{ color: 'error.main' }}>
          <InputHelperText error={error?.message} helperText={helperText} />
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};
