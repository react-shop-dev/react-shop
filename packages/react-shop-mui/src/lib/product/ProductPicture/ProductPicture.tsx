import { useThumbnail } from '@hooks/useThumbnail';
import { MuiLazyImage, type MuiLazyImageProps } from '../../picture/MuiLazyImage';
import { ProductLink } from '../ProductLink';

export type ProductPictureProps = MuiLazyImageProps & {
  path?: string;
  hasLink?: boolean;
};

export const ProductPicture = (props: ProductPictureProps) => {
  const { id, className, path, hasLink, ...rest } = props;
  const thumbnail = useThumbnail(path);

  const renderImage = () => (
    <MuiLazyImage
      fill
      src={thumbnail}
      className={className}
      alt={`Product ID: ${id}`}
      sizes="(max-width: 768px) 50vw, 350px"
      rgbDataPlaceholder={[255, 255, 255]}
      {...rest}
    />
  );

  return hasLink ? <ProductLink tabIndex={-1}>{renderImage()}</ProductLink> : renderImage();
};
