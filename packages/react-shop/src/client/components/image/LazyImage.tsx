import { ReactNode, Fragment, ReactElement, useState } from 'react';
import { ImageProps } from 'next/image';
import type { Identifier } from 'react-shop-types';
import { rgbDataURL } from './placeholder';
import { useBasepath } from 'src/client/router';
import { ImageProvider, getLoaderByProvider } from './loaders';
import { removeDoubleSlashes } from '@lib/removeDoubleSlashes';
import { NextImage } from './NextImage';

export interface LazyImageProps extends Omit<ImageProps, 'src' | 'alt' | 'objectFit' | 'id'> {
  src?: string;
  imageBar?: ReactNode;
  className?: string;
  responsive?: boolean;
  objectFit?: 'cover' | 'contain' | 'none';
  alt?: string;
  provider?: ImageProvider;
  id?: Identifier;
  notFoundPlaceholder?: ReactElement;
  rgbDataPlaceholder?: [number, number, number];
}

export const LazyImage = (props: LazyImageProps) => {
  const [notFound, setNotFound] = useState(false);

  const {
    id,
    src = defaultSrc,
    width,
    height,
    alt = '', // If the image is purely decorative
    title,
    className,
    loader,
    provider,
    placeholder = 'blur',
    quality = 80,
    fill,
    responsive,
    imageBar,
    objectFit = 'contain',
    style,
    notFoundPlaceholder,
    rgbDataPlaceholder = [227, 227, 227],
    ...rest
  } = props;

  const basepath = useBasepath();

  let imageSrc = src;
  if (imageSrc === null) {
    // TODO: fix null value
  }
  if (typeof imageSrc === 'string' && !imageSrc.startsWith('http')) {
    imageSrc = `${removeDoubleSlashes(`${basepath}${src}`)}`;
  }

  return notFound ? (
    notFoundPlaceholder
  ) : (
    <Fragment>
      <NextImage
        src={imageSrc}
        width={width}
        height={height}
        fill={fill}
        alt={alt}
        title={title}
        quality={quality}
        placeholder={placeholder}
        loader={loader || getLoaderByProvider(provider)}
        {...(id ? { id: String(id) } : {})}
        className={className}
        {...(placeholder === 'blur'
          ? { blurDataURL: props.blurDataURL || rgbDataURL(...rgbDataPlaceholder) }
          : {})}
        onError={() => setNotFound(true)}
        style={
          fill ? { objectFit, ...style } : responsive ? { ...responsiveStyles, ...style } : style
        }
        {...rest}
      />
      {imageBar}
    </Fragment>
  );
};

// Avoid error: "Image is missing required "src" property"
const defaultSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const responsiveStyles = {
  width: '100%',
  height: 'auto',
};
