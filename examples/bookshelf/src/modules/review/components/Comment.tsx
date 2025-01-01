import type { ReactNode } from 'react';
import { FlexBox } from 'react-shop-mui/FlexBox';
import { RatingField } from 'react-shop-mui/RatingField';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatDistance } from 'date-fns';
import type { Review } from '@/types';

export const Comment = ({ actions, item }: { item: Review; actions?: ReactNode }) => {
  const { comment, author, avatar, rating, created_at } = item;

  return (
    <Box maxWidth={600} mb={4}>
      <FlexBox alignItems="center" gap={2} mb={2}>
        <Avatar alt="author" src={avatar} sx={{ width: 48, height: 48 }} />
        <Box>
          <Typography component="div" lineHeight={1} fontWeight={600} fontSize={16} mb={1}>
            {author}
          </Typography>
          <FlexBox alignItems="center" gap={1.25}>
            <RatingField size="small" value={rating} />
            <Typography component="div" fontWeight={600}>
              {rating}
            </Typography>
            <Typography component="span">{getTimeDirrerence(created_at)}</Typography>
          </FlexBox>
        </Box>
        {actions ? <Box sx={{ ml: 'auto' }}>{actions}</Box> : null}
      </FlexBox>
      <Typography component="p" gutterBottom color="grey.700">
        {comment}
      </Typography>
    </Box>
  );
};

const getTimeDirrerence = (date: Date) => formatDistance(date, new Date(), { addSuffix: true });
