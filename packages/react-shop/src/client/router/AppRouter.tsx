import { Fragment } from 'react';
import type { ReactNode, ComponentType } from 'react';
import { isValidElementType } from 'react-is';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Authenticated } from '../auth/Authenticated';

export interface AppRouterProps<LayoutProps = any> {
  children?: ReactNode;
  layout?: ComponentType<LayoutProps>;
}

export const AppRouter = (props: AppRouterProps) => {
  const { children, layout: Layout } = props;

  const segments = useSelectedLayoutSegments();

  const isPageNotFound =
    typeof window !== 'undefined' &&
    !!document.querySelector('meta[name="next-error"][content="not-found"]');

  const content =
    isValidElementType(Layout) && !segments.includes('(noLayout)') && !isPageNotFound ? (
      <Layout>{children}</Layout>
    ) : (
      <Fragment>{children}</Fragment>
    );

  const renderWithAuthCheck = () =>
    segments.includes('(protected)') ? <Authenticated>{content}</Authenticated> : content;

  return renderWithAuthCheck();
};

AppRouter.displayName = 'ShopAppRouter';
