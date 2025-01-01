import { useTranslate } from 'react-shop/translate';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { Button, type ButtonProps } from '@button/Button';
import { IconTooltipButton } from '@button/IconTooltipButton';

export type InBasketButtonProps = ButtonProps & { label?: string; compact?: boolean };

export const InBasketButton = ({
  label = 'rs.cart.inside',
  compact,
  ...rest
}: InBasketButtonProps) => {
  const translate = useTranslate();

  return compact ? (
    <Tooltip title={translate(label)}>
      <Box component="span">
        <IconTooltipButton color="success" size="small" sx={{ p: 1 }} {...rest}>
          <AddShoppingCartIcon />
        </IconTooltipButton>
      </Box>
    </Tooltip>
  ) : (
    <Button size="large" color="success" variant="text" label={label} {...rest}>
      <AddShoppingCartIcon />
    </Button>
  );
};
