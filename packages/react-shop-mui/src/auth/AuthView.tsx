import {
  useState,
  SyntheticEvent,
  ReactNode,
  isValidElement,
  SetStateAction,
  useMemo,
} from 'react';
import { useTranslate } from 'react-shop/translate';
import Grow from '@mui/material/Grow';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { AuthTabPanel } from './AuthTabPanel';
import { AuthWrapper } from '@auth/AuthWrapper';
import { AuthHeader } from '@auth/AuthHeader';
import { AuthBoxTitle } from '@auth/AuthBoxTitle';
import { AuthPlaceholder } from './AuthPlaceholder';

export interface AuthViewProps {
  signInTitle?: string;
  signUpTitle?: string;
  signIn: ({
    redirectToForgotPassword,
  }: {
    redirectToForgotPassword: () => SetStateAction<void>;
  }) => ReactNode;
  signUp: () => ReactNode | null;
  forgotPassword?: ReactNode;
  isLoading?: boolean;
}

export const AuthView = ({
  signIn,
  signUp,
  signInTitle = 'rs.auth.sign_in',
  signUpTitle = 'rs.auth.sign_up',
  forgotPassword,
  isLoading,
}: AuthViewProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const translate = useTranslate();

  const handleTabChange = (_event: SyntheticEvent | null, newValue: number) => {
    setTabIndex(newValue);
  };

  const forgotPasswordMode = useMemo(() => tabIndex === 2, [tabIndex]);

  const signInProps = { redirectToForgotPassword: () => handleTabChange(null, 2) };

  const renderForgotPassword = () =>
    isValidElement(forgotPassword) ? (
      <Box sx={{ position: forgotPasswordMode ? 'relative' : 'absolute' }}>
        <Slide
          in={forgotPasswordMode}
          direction="left"
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 300, exit: 0 }}
        >
          {forgotPassword}
        </Slide>
      </Box>
    ) : null;

  const renderTabs = () => (
    <Box>
      {!forgotPasswordMode ? (
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label={translate(signInTitle)} />
          <Tab label={translate(signUpTitle)} />
        </Tabs>
      ) : null}
      <AuthTabPanel value={tabIndex} index={0}>
        {signIn(signInProps)}
      </AuthTabPanel>
      <AuthTabPanel value={tabIndex} index={1}>
        {signUp()}
      </AuthTabPanel>
    </Box>
  );

  const renderSignInOnly = () => (
    <Box>
      <Box display="flex" justifyContent="center">
        <AuthBoxTitle title={signInTitle} />
      </Box>
      <AuthTabPanel value={tabIndex} index={0}>
        {signIn(signInProps)}
      </AuthTabPanel>
    </Box>
  );

  return (
    <AuthWrapper
      sx={{
        boxShadow: 'none',
        backgroundColor: 'inherit',
        backgroundImage: 'none',
      }}
    >
      <AuthHeader
        showBackIcon={forgotPasswordMode}
        handleClick={() => {
          handleTabChange(null, 0);
        }}
      />
      {isLoading ? <AuthPlaceholder /> : null}
      <Grow in={!isLoading} timeout={{ enter: 500, exit: 0 }}>
        {isValidElement(signUp()) ? renderTabs() : renderSignInOnly()}
      </Grow>
      {renderForgotPassword()}
    </AuthWrapper>
  );
};
