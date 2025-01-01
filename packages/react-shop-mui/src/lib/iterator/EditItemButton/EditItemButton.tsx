import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import EditIcon from '@mui/icons-material/Edit';
import { IconTooltipButton, type IconTooltipButtonProps } from '@button/IconTooltipButton';

export const EditItemButton = (props: EditItemButtonProps) => {
  const { viewMode, label = viewMode ? 'rs.action.edit' : 'rs.action.cancel', ...rest } = props;

  return (
    <IconTooltipButton label={label} onClick={() => undefined} size="small" {...rest}>
      {viewMode ? <EditIcon /> : <DoDisturbIcon />}
    </IconTooltipButton>
  );
};

export type EditItemButtonProps = Omit<IconTooltipButtonProps, 'onClick'> & {
  viewMode?: boolean;
};
