import DeleteIcon from '@mui/icons-material/Delete';
import { useSimpleFormIteratorItem } from '../useSimpleFormIteratorItem';
import { IconTooltipButton, type IconTooltipButtonProps } from '@button/IconTooltipButton';

export const RemoveIteratorItemButton = (props: RemoveIteratorItemButtonProps) => {
  const { label = 'rs.action.remove', ...rest } = props;

  const { remove } = useSimpleFormIteratorItem();

  return (
    <IconTooltipButton label={label} onClick={() => remove()} size="small" {...rest}>
      <DeleteIcon />
    </IconTooltipButton>
  );
};

export type RemoveIteratorItemButtonProps = Omit<IconTooltipButtonProps, 'onClick'>;
