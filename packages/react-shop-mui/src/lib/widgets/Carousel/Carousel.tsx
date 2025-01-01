'use client';
import { Children } from 'react';
import type { Property } from 'csstype';
import type { SxProps } from '@mui/material/styles';
import { CarouselMui, type CarouselMuiProps } from '../CarouselMui';
import { MuiLazyImage, type MuiLazyImageProps } from 'src/lib/picture/MuiLazyImage';
import { StyledCarousel } from './Carousel.styles';

export type CarouselProps = CarouselMuiProps & {
  sx?: SxProps;
  height?: Property.Width;
  minHeight?: Property.MinHeight;
  maxWidth?: Property.Height;
  images?: MuiLazyImageProps[];
};

export const Carousel = ({
  images = [],
  maxWidth,
  height = '45%',
  minHeight,
  sx,
  children,
  ...props
}: CarouselProps) => {
  if (images && Children.count(children) > 0) {
    throw new Error('Carousel cannot display both `images` and `children` props');
  }

  return (
    <StyledCarousel maxWidth={maxWidth} sx={sx}>
      <CarouselMui {...props}>
        {images.length > 0
          ? images.map(({ alt, src, id, ...rest }, index) => (
              <MuiLazyImage
                fill
                src={src}
                key={`${id}:${index}`}
                alt={alt || `Slide Image ${index + 1}`}
                objectFit="cover"
                sx={{ paddingBottom: height, minHeight: minHeight || '250px' }}
                {...rest}
              />
            ))
          : children}
      </CarouselMui>
    </StyledCarousel>
  );
};
