import MuiRating, { type RatingProps as MuiRatingProps } from '@mui/material/Rating';
import isNumber from 'lodash/isNumber';

export type RatingFieldProps = MuiRatingProps;

export const RatingField = (props: RatingFieldProps) => {
  const { readOnly = true, value, precision = 0.1, ...rest } = props;

  return (
    <MuiRating
      value={isNumber(Number(value)) ? Number(value) : undefined}
      readOnly={readOnly}
      precision={precision}
      {...rest}
    />
  );
};
