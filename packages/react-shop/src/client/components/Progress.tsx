import { useEffect, memo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress, { NProgressOptions } from 'nprogress';
import 'nprogress/nprogress.css';

export type ProgressPropsProps = Partial<NProgressOptions> & {
  height?: number;
};

export const Progress = memo(({ height = 2, ...options }: ProgressPropsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    NProgress.configure(options);

    const handleAnchorClick = (event: MouseEvent): void => {
      if (
        event.button === 1 || // checks for middle-click
        event.metaKey ||
        event.ctrlKey ||
        ((event.target as HTMLAnchorElement).hasAttribute('target') &&
          (event.target as HTMLAnchorElement).getAttribute('target') !== '_self')
      ) {
        return;
      }

      const targetUrl = (event?.currentTarget as HTMLAnchorElement)?.href;
      const currentUrl = location.href;

      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll<HTMLAnchorElement>(
        'a[href]:not([target="_blank"])',
      );
      anchorElements.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, {
      childList: true,
      subtree: true,
    });
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  const styles = (
    <style>
      {`
          #nprogress {
            pointer-events: none;
          }
          #nprogress .bar {
            background-color: var(--shop-palette-primary-main);
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${height}px;
          }
          #nprogress .peg {
            box-shadow: none;
          }
        `}
    </style>
  );

  return styles;
});

Progress.displayName = 'Progress';

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];
