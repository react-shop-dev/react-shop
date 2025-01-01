import { required, useCreate, useNotify, UserIdentity } from 'react-shop';
import { RatingInput } from 'react-shop-mui/RatingInput';
import { TextInput } from 'react-shop-mui/TextInput';
import type { Identifier } from 'react-shop-types';
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';
import { AddReviewForm } from '../components/AddReviewForm';
import { ReviewFieldTitle } from '../components/ReviewFieldTitle';
import { AddReviewLayout } from './AddReviewLayout';
import type { Review } from '@/types';

type AddReviewProps = { id: Identifier; user: UserIdentity };

export const AddReview = (props: AddReviewProps) => {
  const { id, user } = props;

  const [create] = useCreate();
  const notify = useNotify();

  const submitHandle = async (values: Record<any, string>) => {
    const review: Review = {
      id: uuidv4(),
      comment: values.comment,
      status: 'accepted', // Show immediately for demo
      rating: +values.rating,
      author_id: user.id,
      product_id: id,
      created_at: new Date(),
      author: user.name ?? 'Guest',
      ...(user?.image ? { avatar: user?.image } : {}),
    };
    await create(
      'reviews',
      { data: review },
      {
        onSuccess: () => {
          notify('Your feedback was added', { type: 'success' });
        },
      },
    );
  };

  return (
    <AddReviewLayout title="Write a Review for this product">
      <AddReviewForm onSubmit={submitHandle}>
        <Box sx={{ mb: 2 }}>
          <ReviewFieldTitle>Your Rating *</ReviewFieldTitle>
          <RatingInput source="rating" validate={required()} />
        </Box>
        <Box sx={{ mb: 1 }}>
          <ReviewFieldTitle>Your Review *</ReviewFieldTitle>
          <TextInput
            label={false}
            multiline
            source="comment"
            rows={4}
            validate={required()}
            placeholder="Write a review ..."
          />
        </Box>
      </AddReviewForm>
    </AddReviewLayout>
  );
};
