import { Plugin } from 'esbuild';
import { NodeResolvePlugin } from '@esbuild-plugins/node-resolve';

export const markAsExternalPlugin: Plugin = NodeResolvePlugin({
  extensions: ['.js', 'ts', 'jsx', 'tsx'],
  onResolved: resolved => {
    if (resolved.includes('node_modules')) {
      return {
        external: true,
      };
    }
    return resolved;
  },
});
