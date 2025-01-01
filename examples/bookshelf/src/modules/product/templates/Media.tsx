'use client';

import { useState } from 'react';
import { useRecordContext } from 'react-shop';
import { FlexBox } from 'react-shop-mui/FlexBox';
import { ImageGallery } from 'react-shop-mui/ImageGallery';
import { ImageWithZoom } from 'react-shop-mui/ImageWithZoom';
import type { Identifier } from 'react-shop-types';
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import { getPropFromObject } from '@/lib/utils/getPropFromObject';
import type { StoreItem } from '@/types';

type MediaProps = { id: Identifier };

export const Media = (props: MediaProps) => {
  const { id } = props;
  const product = useRecordContext<StoreItem>();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const selectedImage = getPropFromObject(product, `images.${activeSlide}.url`, product?.thumbnail);
  const images = product?.images || [];

  return (
    <FlexBox flexDirection="column">
      <StyledImageBox>
        <ImageWithZoom
          src={selectedImage}
          alt={`Product: ${id}`}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          linkTo={`/products/image/${extractImageFileName(selectedImage)}`}
        />
      </StyledImageBox>
      {images.length > 1 ? (
        <Box sx={{ width: '50%', mx: 'auto' }}>
          <ImageGallery
            activeSlide={activeSlide}
            images={images}
            handleImageClick={setActiveSlide}
          />
        </Box>
      ) : null}
    </FlexBox>
  );
};

const extractImageFileName = (url?: string) => {
  if (!url) return;
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const [name, extension] = filename.split('.');
  return `${name}?format=${extension}`;
};

const StyledImageBox = styled(Box)(({ theme }) => ({
  height: '500px',
  maxWidth: '500px',
  width: '100%',
  flex: '1 1 auto',
  marginBottom: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: 'auto',
}));
