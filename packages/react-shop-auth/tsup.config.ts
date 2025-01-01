import { defineConfig, Options } from 'tsup';
import { markAsExternalPlugin } from '../../plugins/mark-as-external';

const sharedConfig: Partial<Options> = {
  format: ['esm', 'cjs'],
  outDir: 'dist',
  platform: 'browser',
  sourcemap: true,
  clean: false,
  minify: true,
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs' }),
  esbuildPlugins: [markAsExternalPlugin],
};

export default defineConfig(options => [
  {
    entry: {
      index: 'src/index.ts',
    },
    ...sharedConfig,
    esbuildOptions(options) {
      options.legalComments = 'inline';
      options.banner = {
        js: `'use client'`,
      };
    },
  },
  {
    entry: { server: 'src/server/index.ts' },
    ...sharedConfig,
    onSuccess: options.watch ? 'pnpm types' : undefined,
  },
]);
