import Typography from '@mui/material/Typography';
import { Comment } from '@/modules/review/components/Comment';
import { RemoveCommentButton } from '../components/RemoveCommentButton';
import type { Review } from '@/types';

type ReviewsListProps = {
  data?: Review[];
  userId?: string;
};

export const ReviewsList = (props: ReviewsListProps) => {
  const { data, userId } = props;

  if (!data?.length) {
    return <Typography color="grey.600">No reviews yet</Typography>;
  }

  return data.map((item: Review) => (
    <Comment
      key={item.id}
      actions={userId === item.author_id ? <RemoveCommentButton id={item.id} /> : null}
      item={item}
    />
  ));
};
