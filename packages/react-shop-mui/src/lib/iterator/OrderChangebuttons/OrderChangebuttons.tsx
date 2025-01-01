import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconTooltipButton, type IconTooltipButtonProps } from '@button/IconTooltipButton';
import { useSimpleFormIteratorItem } from '../useSimpleFormIteratorItem';

export const OrderChangebuttons = (props: OrderChangebuttonsProps) => {
  const { rootClassName, ...rest } = props;

  const { index, total, reOrder } = useSimpleFormIteratorItem();

  return (
    <span className={rootClassName}>
      <IconTooltipButton
        label="rs.action.move_up"
        size="small"
        disabled={index <= 0}
        onClick={() => reOrder(index - 1)}
        {...rest}
      >
        <ArrowUpwardIcon fontSize="small" />
      </IconTooltipButton>
      <IconTooltipButton
        label="rs.action.move_down"
        size="small"
        disabled={total == null || index >= total - 1}
        onClick={() => reOrder(index + 1)}
        {...rest}
      >
        <ArrowDownwardIcon fontSize="small" />
      </IconTooltipButton>
    </span>
  );
};

export type OrderChangebuttonsProps = IconTooltipButtonProps & { rootClassName?: string };
