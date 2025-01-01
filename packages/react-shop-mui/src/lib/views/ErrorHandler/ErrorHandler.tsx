import { useEffect, ComponentType, Fragment } from 'react';
import { useTranslate } from 'react-shop/translate';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ErrorIcon from '@mui/icons-material/Error';
import type { SxProps } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import History from '@mui/icons-material/History';
import { Centered } from '../Centered';
import { Button } from '@button/Button';
import { StyledErrorHandlerClasses, StyledErrorHandler } from './ErrorHandler.styles';

export interface ErrorPageProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export interface ErrorHandlerProps extends ErrorPageProps {
  mode: typeof process.env.NODE_ENV;
  icon?: ComponentType<SvgIconProps>;
  title?: string;
  sx?: SxProps;
}

export const ErrorHandler = (props: ErrorHandlerProps) => {
  const { error, reset, mode, icon: Icon = ErrorIcon, title = 'rs.message.error', sx } = props;

  const translate = useTranslate();

  useEffect(() => {
    console.error('error:', error);
  }, [error]);

  const handleClick = () => {
    reset && reset();
    window.history.go(-1);
  };

  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <StyledErrorHandler sx={sx}>
      <Centered>
        <Icon className={StyledErrorHandlerClasses.icon} color="warning" />
        <Typography component="h1" variant="h6" gutterBottom>
          {translate(title)}
        </Typography>
        {mode !== 'production' && errorMessage ? (
          <Fragment>
            <Alert severity="error" sx={{ my: 2, maxWidth: '100ch' }}>
              {translate(errorMessage, { _: errorMessage })}
            </Alert>
          </Fragment>
        ) : null}
        <Button label="rs.navigation.back" onClick={handleClick}>
          <History />
        </Button>
      </Centered>
    </StyledErrorHandler>
  );
};
