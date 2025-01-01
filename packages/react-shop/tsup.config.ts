import { defineConfig, Options } from 'tsup';
import { markAsExternalPlugin } from './../../plugins/mark-as-external';
import { nextJsEsmReplacePlugin } from '../../plugins/next-js-esm-replace';

const sharedConfig: Partial<Options> = {
  format: ['esm', 'cjs'],
  outDir: 'dist',
  sourcemap: true,
  clean: false,
  splitting: false,
  plugins: [markAsExternalPlugin, nextJsEsmReplacePlugin],
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs' }),
};

export default defineConfig(options => [
  {
    entry: {
      index: 'src/index.ts',
      translate: 'src/client/i18n/useTranslate.ts',
    },
    platform: 'browser',
    esbuildOptions(options) {
      options.legalComments = 'inline';
      options.banner = {
        js: `'use client'`,
      };
    },
    ...sharedConfig,
    minify: !options.watch,
  },
  {
    entry: { functions: 'src/functions/index.ts' },
    platform: 'browser',
    ...sharedConfig,
    minify: !options.watch,
  },
  {
    entry: { middleware: 'src/middleware/index.ts' },
    ...sharedConfig,
    minify: !options.watch,
  },
  {
    entry: { server: 'src/server/index.ts' },
    platform: 'node',
    esbuildOptions(options) {
      options.legalComments = 'inline';
      options.banner = {
        js: `'use server'`,
      };
    },
    ...sharedConfig,
    minify: !options.watch,
    onSuccess: options.watch ? 'pnpm types' : undefined,
  },
]);
