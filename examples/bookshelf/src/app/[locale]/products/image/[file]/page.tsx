import Box from '@mui/material/Box';
import { FullScreenImage } from '@/modules/product/components/FullScreenImage';

type Params = Promise<{ file?: string }>;
type SearchParams = Promise<{ format?: string }>;

export default async function ProductImagePage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  return params.file ? (
    <Box sx={{ minHeight: '100dvh', py: 4, width: '500px', margin: '0 auto' }}>
      <FullScreenImage fill fileName={params.file} format={searchParams?.format} />
    </Box>
  ) : null;
}
