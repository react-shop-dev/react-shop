import { forwardRef, ForwardedRef, startTransition, MouseEvent, ReactNode } from 'react';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { eventEmitter } from '../lib';

export type NextLinkProps = LinkProps & {
  pending?: boolean;
  children?: ReactNode;
};

const NextLinkComponent = (props: NextLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { href, replace = false, scroll = true, prefetch = true, pending = false, ...rest } = props;

  const router = useRouter();

  const handleRouterStartEvent = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isModifiedEvent(event)) {
      return;
    }
    event.preventDefault();
    eventEmitter.emit('routerChangeStart');
    startTransition(() => {
      const url = href.toString();
      if (replace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    });
  };

  return (
    <Link
      ref={ref}
      href={href}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      onClick={pending ? handleRouterStartEvent : undefined}
      suppressHydrationWarning
      {...rest}
    />
  );
};

const isModifiedEvent = (event: MouseEvent): boolean => {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute('target');
  return (
    (target && target !== '_self') ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
};

export const NextLink = forwardRef(NextLinkComponent);
