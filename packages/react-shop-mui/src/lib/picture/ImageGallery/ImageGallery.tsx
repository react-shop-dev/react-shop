'use client';

import isFunction from 'lodash/isFunction';
import type { Image as ProductImage } from 'react-shop-types';
import clsx from 'clsx';
import type { ControlProps } from 'nuka-carousel';
import { MuiLazyImage, type MuiLazyImageProps } from '../MuiLazyImage';
import { CarouselMui, type CarouselMuiProps } from '../../widgets/CarouselMui';
import { NextArrowButton, PrevArrowButton } from '../../widgets/Controls';
import { StyledImageGallery, ImageGalleryClasses } from './ImageGallery.styles';

export type ImageSliderProps = {
  images?: Array<ProductImage>;
  activeSlide: number;
  handleImageClick?: (activeIndex: number) => void;
  carouselProps?: CarouselMuiProps;
  imageProps?: MuiLazyImageProps;
  slidesToShow?: number;
};

const SLIDES_TO_SHOW = 3;

export const ImageGallery = (props: ImageSliderProps) => {
  const {
    images = [],
    slidesToShow = SLIDES_TO_SHOW,
    activeSlide,
    handleImageClick,
    carouselProps,
    imageProps,
  } = props;

  const noSliderMode = images.length <= slidesToShow;

  return (
    <StyledImageGallery>
      <CarouselMui
        wrapAround={false}
        slidesToShow={slidesToShow}
        withoutControls={noSliderMode}
        renderBottomCenterControls={() => null}
        cellSpacing={1}
        renderCenterLeftControls={PrevButton}
        renderCenterRightControls={NextButton}
        {...carouselProps}
      >
        {images.map((image, index) => (
          <MuiLazyImage
            key={image.id || index}
            src={image.url}
            width={64}
            height={84}
            holder={false}
            imageClassName={clsx(ImageGalleryClasses.image, imageProps?.className, {
              active: activeSlide === index,
            })}
            onClick={() => (isFunction(handleImageClick) ? handleImageClick(index) : null)}
            {...imageProps}
          />
        ))}
      </CarouselMui>
    </StyledImageGallery>
  );
};

const PrevButton = (props: ControlProps) => <PrevArrowButton {...props} sx={{ left: '-40px' }} />;
const NextButton = (props: ControlProps) => <NextArrowButton {...props} sx={{ right: '-40px' }} />;
