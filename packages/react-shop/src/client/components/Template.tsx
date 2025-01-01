import { Fragment } from 'react';
import { useTranslate } from '../i18n';
import { Title } from './Title';
import { usePathnames } from '../router';
import { Seo } from './Seo';
import { parseSlugifiedUrl } from '@functions/slugify';

export const ShopTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathnames = usePathnames();
  const translate = useTranslate();

  const page = pathnames.at(-1)?.key;
  const title = parseSlugifiedUrl(page ? translate(`pages.${page}`, { _: page }) : undefined);

  return (
    <Fragment>
      <Title title={title} />
      <Seo />
      {children}
    </Fragment>
  );
};
