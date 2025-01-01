import { NextLink } from 'react-shop';
import { IconTooltipButton } from 'react-shop-mui/IconTooltipButton';
import { TitleBox } from 'react-shop-mui/TitleBox';
import type { Identifier } from 'react-shop-types';
import ListIcon from '@mui/icons-material/List';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { ACCOUNT_URL } from '@/lib/constants';

type OrderShowTitleProps = { id?: Identifier; title?: string };

export const OrderShowTitle = ({ id, title = 'Order' }: OrderShowTitleProps) => {
  return (
    <TitleBox
      title={`${title} ${typeof id === 'number' ? `#${id}` : ''}`}
      icon={<LocalMallIcon color="primary" />}
    >
      <NextLink href={`${ACCOUNT_URL}/orders`}>
        <IconTooltipButton label="Back to list">
          <ListIcon />
        </IconTooltipButton>
      </NextLink>
    </TitleBox>
  );
};
