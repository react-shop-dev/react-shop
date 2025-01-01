'use client';
import { Fragment } from 'react';
import { useTranslate, useRecordContext, useProductInterface } from 'react-shop';
import { type TypographyProps } from '@mui/material/Typography';
import { ProductLink } from 'src/lib/product/ProductLink';
import { StyledProductTitle } from './ProductTitle.styles';

export interface ProductTitleProps extends Omit<TypographyProps, 'id' | 'ref'> {
  path?: string;
  hasLink?: boolean;
  withId?: boolean;
}

export const ProductTitle = (props: ProductTitleProps) => {
  const { title: titleKey } = useProductInterface();

  const { path = titleKey, hasLink = false, withId = false, ...rest } = props;

  const record = useRecordContext();
  const translate = useTranslate();

  const title = record ? record[path] : undefined;
  const translatedTitle = translate(title, { _: title });

  const renderTitle = () => {
    return (
      <Fragment>
        {typeof title === 'string' ? translatedTitle : title} {withId && `# ${record?.id}`}
      </Fragment>
    );
  };

  return (
    <StyledProductTitle title={translatedTitle} {...rest}>
      {hasLink ? <ProductLink>{renderTitle()}</ProductLink> : renderTitle()}
    </StyledProductTitle>
  );
};
