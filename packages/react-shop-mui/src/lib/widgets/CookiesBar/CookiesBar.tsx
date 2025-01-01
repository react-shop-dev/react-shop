import { useState, ReactNode, useEffect, isValidElement, Fragment } from 'react';
import { useAcceptCookies, useTranslate } from 'react-shop';
import { useSearchParams } from 'next/navigation';
import type { SxProps } from '@mui/material/styles';
import Alert, { type AlertProps } from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Button } from '@button/Button';
import { FlexBox } from '@views/FlexBox';
import { CookiesBarClasses, StyledCookiesBar } from './CookiesBar.styles';

export type CookiesBarProps = {
  message?: string | ReactNode;
  actions?: ReactNode;
  sx?: SxProps;
  alertProps?: AlertProps;
};

export const CookiesBar = (props: CookiesBarProps) => {
  const {
    sx,
    alertProps,
    actions,
    message = (
      <>
        This site uses cookies 🍪 to improve your experience. <br /> By clicking, you agree to our{' '}
        <a target="_blank" href="/policy?hideCookies">
          Privacy Policy
        </a>
        .
      </>
    ),
  } = props;

  const [open, setOpen] = useState(false);
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const hideCookies = useSearchParams().get('hideCookies');
  const translate = useTranslate();

  useEffect(() => {
    if (!acceptedCookies) {
      setOpen(true);
    }
  }, [acceptedCookies]);

  const handleClose = () => {
    setOpen(false);
  };

  const CookieBarActions = () => {
    return isValidElement(actions) ? (
      actions
    ) : (
      <FlexBox gap={2} className={CookiesBarClasses.actions}>
        <Button
          color="primary"
          label={translate('rs.action.accept')}
          onClick={() => {
            handleClose();
            onAcceptCookies(true);
          }}
        />
        <Button
          color="inherit"
          variant="outlined"
          label={translate('rs.action.decline')}
          onClick={() => {
            handleClose();
            onAcceptCookies(false);
          }}
        />
      </FlexBox>
    );
  };

  return !acceptedCookies && !hideCookies ? (
    <Fragment>
      <Backdrop open={open} sx={theme => ({ zIndex: theme.zIndex.drawer })} />
      <StyledCookiesBar sx={sx}>
        <Collapse in={open}>
          <Alert icon={false} variant="standard" severity="info" {...alertProps}>
            <Typography component="p" textAlign="center" variant="body1" sx={{ p: 2 }}>
              {message}
            </Typography>
            <CookieBarActions />
          </Alert>
        </Collapse>
      </StyledCookiesBar>
    </Fragment>
  ) : null;
};

export default CookiesBar;
