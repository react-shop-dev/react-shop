import Card, { type CardProps } from '@mui/material/Card';
import { css } from '@emotion/react';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopProductCard';

export const ProductCardClasses = {
  grid: `${PREFIX}-grid`,
  list: `${PREFIX}-list`,
  picture: `${PREFIX}-picture`,
  tags: `${PREFIX}-tags`,
  gridContent: `${PREFIX}-grid-content`,
  listContent: `${PREFIX}-list-content`,
};

const cardContent = css`
  padding: 12px;
  background-image: none;
`;

export const StyledProductCard: StyledComponent<CardProps> = styled(Card, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})`
  display: grid;
  position: relative;
  border-radius: 8px;
  padding: 0;
  background-image: none;
  &.${ProductCardClasses.grid} {
    height: 100%;
    .${ProductCardClasses.picture} {
      height: 295px;
      max-width: 100%;
    }
  }
  &.${ProductCardClasses.list} {
    grid-auto-rows: minmax(250px, auto) auto;
    text-align: center;
    justify-content: center;
    @container (min-inline-size: 600px) {
      text-align: left;
      grid-template-columns: 250px minmax(320px, 1fr);
    }
  }
  .${ProductCardClasses.gridContent} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${cardContent};
  }
  .${ProductCardClasses.listContent} {
    align-self: center;
    font-size: 18px;
    ${cardContent};
  }
  & .${ProductCardClasses.tags} {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }
`;
