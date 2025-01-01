import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import { Head } from './Head';
import { useShopConfig } from '../shop/useShopConfig';
import { useTranslate } from '../i18n';
import { parseSlugifiedUrl } from '@functions/slugify';

type TitleProps = {
  title: string | { absolute: string };
  social?: boolean;
};

export const Title = (props: TitleProps) => {
  const { title: titleProp, social = true } = props;

  const config = useShopConfig();
  const translate = useTranslate();

  let title = titleProp;

  if (isString(titleProp) && !isEmpty(titleProp) && config?.title?.template) {
    title = `${config?.title?.template?.replace(/%s/g, parseSlugifiedUrl(titleProp))}`;
  }
  if (isObject(titleProp)) {
    title = titleProp.absolute;
  }
  if (!title && config?.title?.default) {
    title = config?.title.default;
  }

  const finalTitle = title ? translate(`pages.${title}`, { _: title }) : 'Something went wrong';

  return (
    <Head key={finalTitle}>
      <title>{finalTitle}</title>
      {social ? (
        <meta
          key="og:title"
          name="title"
          property="og:title"
          content={finalTitle ?? config?.openGraph?.title}
        />
      ) : null}
    </Head>
  );
};
