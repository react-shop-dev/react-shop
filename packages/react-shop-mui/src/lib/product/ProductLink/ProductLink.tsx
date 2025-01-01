import { ReactNode, forwardRef } from 'react';
import type { Product } from 'react-shop-types';
import { useRecordContext, useShopConfig } from 'react-shop';
import get from 'lodash/get';
import type { LinkProps } from '@mui/material/Link';
import { NextMuiLink } from '@common/NextMuiLink';
import type { UrlObject } from 'url';

export interface ProductLinkProps extends Omit<LinkProps, 'color' | 'href'> {
  children: ReactNode;
  id?: string;
  record?: Product;
  path?: string;
  href?: UrlObject | string;
}

export const ProductLink = forwardRef<HTMLAnchorElement, ProductLinkProps>((props, ref) => {
  const { record, id, path = 'product.slug', href, children, ...rest } = props;

  const config = useShopConfig();
  const item = useRecordContext({ record });
  const slug = get(config, path);

  const pathname = replacePlaceholders(
    config?.paths?.product,
    get(item, slug),
    id || String(item?.id),
  );

  return (
    <NextMuiLink
      ref={ref}
      color="inherit"
      href={{
        ...(typeof href !== 'string' ? { ...href } : {}),
        pathname,
      }}
      scroll={false}
      {...rest}
    >
      {children}
    </NextMuiLink>
  );
});

function replacePlaceholders(template: string, name?: string, id?: string) {
  if (!template) {
    return;
  }
  let result = template.replace(/%s/g, name || '');
  result = result.replace(/%i/g, id || '');
  return result;
}

ProductLink.displayName = 'ProductLink';
