import { isValidElement, type ReactNode } from 'react';
import { NextLink } from 'react-shop';
import { IconTooltipButton } from 'react-shop-mui/IconTooltipButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { AccountListItemClasses, StyledAccountListItem } from './AccountListItem.styles';

type AccountListItemProps = {
  link?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export const AccountListItem = (props: AccountListItemProps) => {
  const { link, actions = props.link ? <DefaultActions /> : undefined, children } = props;

  const renderItem = () => (
    <StyledAccountListItem>
      <Card>
        <CardContent>
          <Box className={AccountListItemClasses.grid}>
            {children}
            {isValidElement(actions) ? (
              <Box className={AccountListItemClasses.actionButtons}>{actions}</Box>
            ) : null}
          </Box>
        </CardContent>
      </Card>
    </StyledAccountListItem>
  );

  return link ? <NextLink href={link}>{renderItem()}</NextLink> : renderItem();
};

const DefaultActions = () => (
  <IconTooltipButton label="View details">
    <ArrowForwardIcon />
  </IconTooltipButton>
);
