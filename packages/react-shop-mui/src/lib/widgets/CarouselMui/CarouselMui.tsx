'use client';

import { forwardRef } from 'react';
import Carousel, { type CarouselProps as NukaCarouselProps } from 'nuka-carousel';
import clsx from 'clsx';
import { PrevArrowButton, NextArrowButton } from '../Controls';
import { Dots } from '../Dots';
import { defaultCarouselProps } from './defaultProps';

/* Nuka-carousel wrapper with MaterialUI - styled controls */

export type CarouselMuiProps = NukaCarouselProps;

export const CarouselMui = forwardRef<HTMLDivElement, CarouselMuiProps>((props, ref) => {
  const {
    wrapAround = true,
    className,
    slidesToShow = 1,
    slidesToScroll = 1,
    speed = 400,
    children = <></>,
    ...rest
  } = props;

  const settings = {
    ...CarouselArrows,
    ...CarouselDots,
    ...rest,
  };

  return (
    <Carousel
      ref={ref}
      cellAlign="left"
      className={clsx('mui-shop-carousel', className)}
      speed={speed}
      wrapAround={wrapAround}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      {...defaultCarouselProps}
      {...settings}
    >
      {children}
    </Carousel>
  );
});

CarouselMui.displayName = 'CarouselMui';

const CarouselArrows = {
  renderCenterLeftControls: PrevArrowButton,
  renderCenterRightControls: NextArrowButton,
};

const CarouselDots = {
  renderBottomCenterControls: Dots,
};
