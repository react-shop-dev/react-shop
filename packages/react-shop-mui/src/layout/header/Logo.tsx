import { ReactElement, isValidElement } from 'react';
import { Logo as ReactShopLogo, useBasepath, useShopConfig, NextImage } from 'react-shop';
import Link from 'next/link';
import { removeDoubleSlashes } from 'src/utils/removeDoubleSlashes';

export interface LogoProps {
  logo?: ReactElement;
  className?: string;
}

export const Logo = ({ logo, className }: LogoProps) => {
  const config = useShopConfig();
  const basepath = useBasepath();

  const siteLogo = isValidElement(logo) ? (
    logo
  ) : config?.logo ? (
    <NextImage
      priority
      src={removeDoubleSlashes(`/${basepath}${config?.logo?.src}`)}
      alt={config?.title?.default}
      width={config?.logo.width}
      height={config?.logo.height}
    />
  ) : (
    <ReactShopLogo />
  );

  return (
    <Link href="/" className={className}>
      {siteLogo}
    </Link>
  );
};
