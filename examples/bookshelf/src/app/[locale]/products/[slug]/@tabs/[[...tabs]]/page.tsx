import { Suspense } from 'react';
import HelpIcon from '@mui/icons-material/LiveHelpOutlined';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Grid from '@mui/material/Grid2';
import { fetchFAQ } from '@/lib/data/actions';
import { FAQ } from '@/modules/product/components/FAQ';
import { ProductTabs } from '@/modules/product/templates/ProductTabs';
import { CommentSkeleton } from '@/modules/review/components/CommentSkeleton';
import { ReviewTab } from '@/modules/review/templates/ReviewTab';

export default function ProductTabsPage() {
  const faqPromise = fetchFAQ();

  const tabs = [
    {
      label: 'Reviews',
      icon: <ReviewsIcon />,
      count: <span id="reviews-count" />,
      path: '.',
      children: (
        <Suspense fallback={<CommentSkeleton />}>
          <ReviewTab />
        </Suspense>
      ),
    },
    {
      label: 'FAQ',
      icon: <HelpIcon />,
      path: 'faq',
      children: (
        <Suspense fallback="Loading...">
          <FAQ dataPromise={faqPromise} />
        </Suspense>
      ),
    },
  ];

  return (
    <Grid container sx={{ mb: 4 }}>
      <Grid size="grow">
        <ProductTabs tabs={tabs} />
      </Grid>
    </Grid>
  );
}
