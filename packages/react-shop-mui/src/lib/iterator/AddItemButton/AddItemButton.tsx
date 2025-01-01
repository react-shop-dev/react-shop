import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSimpleFormIterator } from '../useSimpleFormIterator';
import { Button, type ButtonProps } from '@button/Button';

export const AddItemButton = (props: Omit<ButtonProps, 'onClick'>) => {
  const { add } = useSimpleFormIterator();

  return (
    <Button size="small" label="rs.action.add" onClick={() => add()} {...props}>
      <AddCircleOutlineIcon />
    </Button>
  );
};
