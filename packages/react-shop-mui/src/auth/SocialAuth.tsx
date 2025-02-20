import { type BaseSyntheticEvent, useState } from 'react';
import { useSignIn, NextImage } from 'react-shop';
import { getShopConfig } from 'react-shop/functions';
import CircularProgress from '@mui/material/CircularProgress';
import { FlexBox } from '@views/FlexBox';
import { AuthFeedback } from '../lib/auth/AuthFeedback';
import type { SxProps } from '@mui/material/styles';
import { Button, type ButtonProps } from '@button/Button';

const providerLogoPath =
  process.env.NEXT_PUBLIC_PROVIDERS_IMG || 'https://authjs.dev/img/providers';

const SocialButton = ({ id, label, ...rest }: { id: string; label: string } & ButtonProps) => (
  <Button variant="outlined" color="inherit" label={label} {...rest}>
    <NextImage src={`${providerLogoPath}/${id}.svg`} width={20} height={20} alt={label} />
  </Button>
);

export interface SocialAuthProps {
  providers: any[];
  sx?: SxProps;
}

export const SocialAuth = ({ providers, sx }: SocialAuthProps) => {
  const config = getShopConfig();
  const afterLoginUrl = config?.auth?.afterLoginUrl;

  const login = useSignIn();
  const [loading, setLoading] = useState<string | null>(null);
  const [authError, setAuthError] = useState<any>(undefined);

  const handleSocial = async (event: BaseSyntheticEvent, provider: any) => {
    event.preventDefault();
    setLoading(provider);
    try {
      await login({ provider, callbackUrl: `/${afterLoginUrl}` });
    } catch (error) {
      setAuthError(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <FlexBox flexDirection="column" gap={1} sx={sx}>
      {providers.map(provider => (
        <SocialButton
          key={provider.id}
          id={provider.id}
          disabled={!!loading}
          className={`social-${provider.name}`}
          label={provider.name}
          onClick={event => handleSocial(event, provider.id)}
          endIcon={loading === provider.id ? <CircularProgress color="inherit" size={20} /> : null}
        />
      ))}
      <AuthFeedback message={authError?.message} />
    </FlexBox>
  );
};
