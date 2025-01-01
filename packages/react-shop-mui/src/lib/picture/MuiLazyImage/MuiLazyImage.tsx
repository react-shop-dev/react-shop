import type { ElementType } from 'react';
import { LazyImage, LazyImageProps } from 'react-shop';
import { clsx } from 'clsx';
import type { SxProps } from '@mui/material/styles';
import ImageBar from '@mui/material/ImageListItemBar';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { LazyImageHolder } from '../LazyImageHolder';
import { LazyImageClasses } from '@picture/LazyImageHolder/LazyImageHolder.styles';

export interface MuiLazyImageProps extends LazyImageProps {
  sx?: SxProps;
  holder?: ElementType | false;
  imageClassName?: string;
}

export const MuiLazyImage = (props: MuiLazyImageProps) => {
  const {
    src,
    width,
    height,
    className,
    imageClassName,
    holder: Holder = LazyImageHolder,
    notFoundPlaceholder = DefaultImagePlacegolder,
    sx = {},
    ...rest
  } = props;

  const renderImage = () => (
    <LazyImage
      src={src}
      width={width}
      height={height}
      notFoundPlaceholder={notFoundPlaceholder}
      className={clsx(imageClassName, LazyImageClasses.image)}
      {...rest}
    />
  );

  return Holder !== false ? (
    <Holder className={className} sx={{ width, height, ...sx }}>
      {renderImage()}
    </Holder>
  ) : (
    renderImage()
  );
};

export const LazyImageBar = ({ title }: { title: string }) => (
  <ImageBar position="top" title={title} className={LazyImageClasses.imageBar} />
);

const DefaultImagePlacegolder = <ImagePlaceholder />;
