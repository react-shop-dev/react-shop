import type { ReactNode } from 'react';

interface RootLayoutProps {
  locale?: string;
  meta?: ReactNode;
  className?: string;
  children: ReactNode;
  dir?: 'ltr' | 'rtl';
}

export const RootLayout = ({ locale, className, meta, dir, children }: RootLayoutProps) => {
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>{meta}</head>
      <body className={className}>{children}</body>
    </html>
  );
};
