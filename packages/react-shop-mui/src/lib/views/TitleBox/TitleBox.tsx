import { ReactElement, Fragment, isValidElement } from 'react';
import isString from 'lodash/isString';
import { useTranslate } from 'react-shop/translate';
import Typography from '@mui/material/Typography';
import Stack, { type StackProps } from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export interface TitleBoxProps extends Omit<StackProps, 'title'> {
  title?: string | ReactElement;
  withDivider?: boolean;
  icon?: ReactElement;
}

export const TitleBox = (props: TitleBoxProps) => {
  const { title, icon, withDivider = true, sx, children, ...rest } = props;

  const translate = useTranslate();

  return (
    <Fragment>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ pt: 1, pb: 1.5, mb: withDivider ? 0 : 2, ...sx }}
        {...rest}
      >
        {icon}
        {isString(title) ? (
          <Typography variant="h5" component="h3" style={{ marginRight: 'auto' }}>
            {translate(title, { _: title })}
          </Typography>
        ) : isValidElement(title) ? (
          title
        ) : null}
        {children}
      </Stack>
      {withDivider ? <Divider sx={{ mb: 2 }} /> : null}
    </Fragment>
  );
};
