import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Head } from './Head';
import { removeDoubleSlashes } from '@lib/removeDoubleSlashes';
import type { OgImage } from 'src/types/config';
import { isBrowser } from '@functions/isBrowser';
import { getShopConfig } from '@functions/shopConfig';

/**
 * Seo optimization for dynamic metadata
 */
export type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    siteName?: string;
    images?: OgImage[];
  };
};

export const Seo = (props: SeoProps) => {
  const { config } = getShopConfig();

  const { description = config?.description, keywords, openGraph } = props;

  const pathname = usePathname();
  const host = isBrowser() ? window.location.origin : config?.host;

  const canonical = pathname === '/' ? host : removeDoubleSlashes(`${host}${pathname || ''}`);

  return (
    <Head>
      <meta
        key="description"
        name="description"
        content={`${config?.title?.default}: ${description}`}
      />
      {keywords && <meta key="keywords" name="keywords" content={keywords} />}
      <link key="cannonical" rel="cannonical" href={canonical} />
      <meta key="og:url" name="og:url" property="og:url" content={host ?? config?.openGraph?.url} />
      <meta
        key="og:description"
        name="og:description"
        property="og:description"
        content={openGraph?.description ?? config?.openGraph?.description ?? description}
      />
      {openGraph?.images?.length
        ? openGraph.images.map((img, index) => ogImage(host, img, index))
        : config?.openGraph?.images?.length
          ? ogImage(host, config?.openGraph.images[0], 0)
          : null}
    </Head>
  );
};

Seo.displayName = 'Seo';

const ogImage = (
  baseUrl: string = '/',
  { url = '', width, height, alt }: OgImage,
  index: number,
) => {
  const imageUrl = baseUrl ? new URL(url, baseUrl).toString() : url;

  return (
    <Fragment key={`og:image:${index}`}>
      <meta
        key={`og:image:url:${index}`}
        id={`og:image:url:${index}`}
        property="og:image"
        content={imageUrl}
      />
      <meta
        key={`og:image:width:${index}`}
        id={`og:image:width:${index}`}
        property="og:image:width"
        content={width}
      />
      <meta
        key={`og:image:height:${index}`}
        id={`og:image:height:${index}`}
        property="og:image:height"
        content={height}
      />
      <meta
        key={`og:image:alt:${index}`}
        id={`og:image:alt:${index}`}
        property="og:image:alt"
        content={alt}
      />
    </Fragment>
  );
};
