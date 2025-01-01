import { useDelete } from 'react-shop';
import { IconTooltipButton } from 'react-shop-mui/IconTooltipButton';
import type { Identifier } from 'react-shop-types';
import DeleteIcon from '@mui/icons-material/Delete';

export const RemoveCommentButton = ({ id }: { id: Identifier }) => {
  const [deleteReview] = useDelete('reviews', { id });

  return (
    <IconTooltipButton label="rs.action.delete" onClick={() => deleteReview()}>
      <DeleteIcon />
    </IconTooltipButton>
  );
};
