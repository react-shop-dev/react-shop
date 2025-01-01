import { Fragment } from 'react';
import { Title } from 'react-shop';
import { notFound, redirect } from 'next/navigation';
import Grid from '@mui/material/Grid2';
import { ScrollToTop } from '@/modules/common/ScrollToTop';
import { WatchProduct } from '@/modules/product/components/WatchProduct';
import { Media } from '@/modules/product/templates/Media';
import { ProductIntro } from '@/modules/product/templates/ProductIntro';

type Params = Promise<{ slug?: string }>;

export default async function ProductIntroPage({ params }: { params: Params }) {
  const slug = (await params).slug;

  if (!slug) {
    redirect('/');
  }

  const [name, id] = slug.split('_id-');

  if (!id) {
    notFound();
  }

  return (
    <Fragment>
      <Title title={name} />
      <WatchProduct id={id} />
      <ScrollToTop />
      <Grid container columnSpacing={4} sx={{ mt: 4, mb: 8 }}>
        <Grid size={{ md: 6, xs: 12 }}>
          <Media id={id} />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <ProductIntro />
        </Grid>
      </Grid>
    </Fragment>
  );
}
