'use client';
import { useCallback } from 'react';
import type { ControlProps } from 'nuka-carousel';
import clsx from 'clsx';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import type { SxProps } from '@mui/material/styles';
import { StyledDots } from './Dots.styles';

export interface DotsProps extends ControlProps {
  size?: number;
  sx?: SxProps;
  className?: string;
  dotsGap?: number;
  dotColor?: string;
  buttonProps?: IconButtonProps;
  dotsStyles?: (active: boolean) => SxProps;
}

// Based on source https://github.com/FormidableLabs/nuka-carousel/blob/main/packages/nuka/src/default-controls.tsx#L237
export const Dots = ({
  pagingDotsIndices = [],
  goToSlide,
  currentSlide,
  onUserNavigation,
  slideCount,
  // injected props
  size = 12,
  className,
  dotsGap = 1,
  dotColor = 'lightGray',
  sx,
  buttonProps = {},
  dotsStyles,
}: DotsProps) => {
  const currentSlideBounded = getBoundedIndex(currentSlide, slideCount);

  const getDotsStyles = useCallback(
    typeof dotsStyles === 'function'
      ? dotsStyles
      : (active: boolean) => ({
          padding: `${size / 3}px`,
          border: `1px solid ${dotColor}`,
          '& > svg': {
            transition: 'scale 400ms ease-in-out',
            scale: active ? 1 : 0,
          },
        }),
    [],
  );

  return (
    <StyledDots gap={dotsGap} className={clsx('mui-shop-carousel-dots', className)} sx={sx}>
      {pagingDotsIndices.map((slideIndex, index) => {
        const isActive =
          currentSlideBounded === slideIndex ||
          (currentSlideBounded < slideIndex &&
            (index === 0 || currentSlideBounded > pagingDotsIndices[index - 1]));

        return (
          <IconButton
            key={slideIndex}
            onClick={event => {
              if (event.defaultPrevented) return;
              onUserNavigation(event);
              goToSlide(slideIndex);
            }}
            aria-label={`slide ${slideIndex + 1} bullet`}
            sx={getDotsStyles(isActive)}
            {...buttonProps}
          >
            <svg
              width={size}
              height={size}
              aria-hidden="true"
              focusable="false"
              viewBox={`0 0 ${size} ${size}`}
              fill={dotColor}
            >
              <circle cx={size / 2} cy={size / 2} r={size / 2} />
            </svg>
          </IconButton>
        );
      })}
    </StyledDots>
  );
};

const getBoundedIndex = (rawIndex: number, slideCount: number) => {
  return ((rawIndex % slideCount) + slideCount) % slideCount;
};
