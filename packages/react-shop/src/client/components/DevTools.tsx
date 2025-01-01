import { QueryClient } from '@tanstack/react-query';
import { Suspense, lazy, ComponentProps } from 'react';

const ReactQueryDevtools: React.FC<DevtoolsOptions> = lazy(() =>
  import('@tanstack/react-query-devtools').then(d => ({
    default: d.ReactQueryDevtools,
  })),
);

export type DevToolsProps = ComponentProps<typeof ReactQueryDevtools>;

export const DevTools = (props: DevToolsProps) => {
  return (
    <Suspense fallback={null}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" {...props} />
    </Suspense>
  );
};

interface DevtoolsOptions {
  initialIsOpen?: boolean;
  buttonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  position?: 'top' | 'bottom' | 'left' | 'right';
  styleNonce?: string;
  shadowDOMTarget?: ShadowRoot;
  client?: QueryClient;
  errorTypes?: Array<DevtoolsErrorType>;
}

interface DevtoolsErrorType {
  name: string;
  initializer: () => Error;
}
