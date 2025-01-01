import ModalImage from '@/modules/common/ModalImage';
import { FullScreenImage } from '@/modules/product/components/FullScreenImage';

type Params = Promise<{ file?: string }>;
type SearchParams = Promise<{ format?: string }>;

export default async function ProductModalImagePage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  return params?.file ? (
    <ModalImage>
      <FullScreenImage
        width={500}
        height={700}
        fileName={params.file}
        format={searchParams.format}
      />
    </ModalImage>
  ) : null;
}
