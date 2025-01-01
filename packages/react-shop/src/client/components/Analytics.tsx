import Script, { type ScriptProps } from 'next/script';

export type GoogleAnalyticsProps = { gtag: string } & ScriptProps;

export const GoogleAnalytics = ({
  id = 'google-analytics',
  strategy = 'afterInteractive',
  gtag,
}: GoogleAnalyticsProps) => {
  return (
    <>
      <Script strategy={strategy} src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`} />
      <Script
        id={id}
        strategy={strategy}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};
