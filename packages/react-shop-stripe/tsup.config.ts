import { defineConfig, Options } from 'tsup';

const sharedConfig: Partial<Options> = {
  format: ['esm', 'cjs'],
  outDir: 'dist',
  platform: 'browser',
  sourcemap: true,
  clean: false,
  shims: true,
  minify: true,
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs' }),
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
    esbuildOptions(options) {
      options.legalComments = 'inline';
      options.banner = {
        js: `'use server'`,
      };
    },
    onSuccess: options.watch ? 'pnpm types' : undefined,
  },
]);
