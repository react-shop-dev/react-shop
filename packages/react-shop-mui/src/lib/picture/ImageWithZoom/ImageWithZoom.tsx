'use client';
import { useState, useRef, TouchEvent, MouseEvent, ComponentType } from 'react';
import { useSafeSetState, NextLink } from 'react-shop';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import type { SxProps } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { MuiLazyImage, type MuiLazyImageProps } from '../MuiLazyImage';
import { FlexBox } from '@views/FlexBox';
import { StyledImageZoom, ImageZoomClasses } from './ImageWithZoom.styles';

export interface ImageWithZoomProps extends MuiLazyImageProps {
  mouseScale?: number;
  linkTo?: string;
  icon?: ComponentType<SvgIconProps> | false;
  sx?: SxProps;
}

export const ImageWithZoom = (props: ImageWithZoomProps) => {
  const {
    mouseScale = 2,
    icon: ZoomIcon = ZoomInIcon,
    holder = false,
    className,
    src,
    linkTo,
    ...rest
  } = props;

  const [zoom, setZoom] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [scale, setScale] = useState(1);
  const [coords, setCoords] = useSafeSetState<Coords>({
    x: null,
    y: null,
  });

  const touchesRef = useRef<any>({});

  const handleOnMouseOver = () => {
    if (isZooming) return;
    setIsHovering(true);
    setScale(mouseScale as number);
  };

  const handleOnMouseOut = () => {
    if (isZooming) return;
    setIsHovering(false);
    setScale(1);
  };

  const handleOnMouseMove = (event: MouseEvent) => {
    if (isZooming) return;
    const x = percentageConvert(
      (event.nativeEvent.offsetX / (event.target as HTMLElement).offsetWidth) * 100,
    );
    const y = percentageConvert(
      (event.nativeEvent.offsetY / (event.target as HTMLElement).offsetHeight) * 100,
    );
    setCoords({ x, y });
  };

  const handleOnTouchStart = (event: TouchEvent) => {
    Array.from(event.targetTouches).forEach(touchPoint => {
      touchesRef.current[touchPoint.identifier] = {
        clientX: touchPoint.clientX,
        clientY: touchPoint.clientY,
      };
    });
    setIsZooming(prevState => prevState || Object.keys(touchesRef.current).length > 1);
  };

  const handleOnTouchEnd = (event: TouchEvent) => {
    Array.from(event.targetTouches).forEach(touchPoint => {
      delete touchesRef.current[touchPoint.identifier];
    });
    if (Object.keys(touchesRef.current).length === 0) {
      setIsZooming(false);
    }
  };

  const handleOnTouchMove = (event: TouchEvent) => {
    if (isZooming) return;

    event.persist();
    const touches = Array.from(event.targetTouches).filter(
      touch => touchesRef.current[touch.identifier],
    );
    if (touches.length === 2) {
      event.stopPropagation();
      //TODO: Touch move handler
    }
  };

  const overlayStyle: { transformOrigin?: string; transform?: string } = {};
  if (isHovering || isZooming) {
    overlayStyle.transformOrigin = `${coords?.x} ${coords?.y}`;
    overlayStyle.transform = `scale(${scale})`;
  }

  return (
    <StyledImageZoom className={className}>
      <FlexBox gap={1} className={ImageZoomClasses.iconBox}>
        {linkTo ? (
          <NextLink href={linkTo} aria-label="Full size">
            <CenterFocusStrongIcon className={ImageZoomClasses.icon} />
          </NextLink>
        ) : null}
        {ZoomIcon !== false ? (
          <ZoomIcon
            color={zoom ? 'primary' : 'inherit'}
            className={ImageZoomClasses.icon}
            onClick={() => setZoom(!zoom)}
            aria-label="Zoom"
          />
        ) : null}
      </FlexBox>
      <MuiLazyImage src={src} priority holder={holder} suppressHydrationWarning {...rest} />
      {zoom ? (
        <MuiLazyImage
          holder={holder}
          src={src}
          style={overlayStyle}
          imageClassName={ImageZoomClasses.imageZoom}
          onMouseOver={handleOnMouseOver}
          onMouseOut={handleOnMouseOut}
          onMouseMove={handleOnMouseMove}
          onFocus={handleOnMouseOver}
          onBlur={handleOnMouseOut}
          onTouchStart={handleOnTouchStart}
          onTouchEnd={handleOnTouchEnd}
          onTouchMove={handleOnTouchMove}
          {...rest}
        />
      ) : null}
    </StyledImageZoom>
  );
};

type Coords = { x: string | null; y: string | null };

const percentageConvert = (num: number) => `${num}%`;
