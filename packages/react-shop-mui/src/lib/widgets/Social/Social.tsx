import type { ReactNode, ReactElement, AnchorHTMLAttributes } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import { useShopConfig } from 'react-shop';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YoutubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RedditIcon from '@mui/icons-material/Reddit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import type { SxProps } from '@mui/material/styles';
import { FlexBox } from '@views/FlexBox';
import { StyledSocialLink } from './Social.styles';

export const Social = (props: SocialProps) => {
  const config = useShopConfig();
  const social = config?.social || [];

  const {
    sx,
    className,
    children = [
      ...social.map((item: Partial<SocialItemType>) => (
        <SocialItem
          key={item.name}
          url={item.url as string}
          name={item.name}
          ariaLabel={item.ariaLabel}
          icon={
            isValidElement(item.icon) ? (
              item.icon
            ) : item.name ? (
              cloneElement(icons[item.name], { fontSize: 'small' })
            ) : (
              <></>
            )
          }
        />
      )),
    ],
  } = props;

  return Children.count(children) ? (
    <FlexBox className={className} gap={1.5} sx={sx}>
      {children}
    </FlexBox>
  ) : null;
};

const icons: { [key: string]: ReactElement } = {
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  youtube: <YoutubeIcon />,
  linkedin: <LinkedInIcon />,
  pinterest: <PinterestIcon />,
  reddit: <RedditIcon />,
  whatsup: <WhatsAppIcon />,
  twitter: <TwitterIcon />,
  x: <XIcon />,
};

const SocialItem = ({ url, icon, name, ariaLabel, ...rest }: SocialItemType) => (
  <StyledSocialLink
    href={url}
    target="_blank"
    title={name}
    tabIndex={0}
    aria-label={ariaLabel || name}
    {...rest}
  >
    {icon}
  </StyledSocialLink>
);

Social.Item = SocialItem;

type SocialItemType = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'as'> & {
  url: string;
  icon: ReactElement;
  name?: string;
  ariaLabel?: string;
};

export type SocialProps = {
  children?: ReactNode;
  className?: string;
  sx?: SxProps;
};
