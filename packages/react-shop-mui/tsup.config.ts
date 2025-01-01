import { defineConfig } from 'tsup';
import { nextJsEsmReplacePlugin } from './../../plugins/next-js-esm-replace';
import { muiIconsEsmReplace } from '../../plugins/mui-icons-esm-replace';
import { markAsExternalPlugin } from '../../plugins/mark-as-external';

export default defineConfig(options => ({
  entry: ['src/index.ts', 'src/lib/**/index.ts'],
  outDir: 'dist',
  platform: 'browser',
  format: ['esm', 'cjs'],
  sourcemap: true,
  splitting: false,
  clean: true,
  minify: !options.watch,
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs' }),
  esbuildOptions(options) {
    options.keepNames = true;
    options.banner = {
      js: '"use client"',
    };
  },
  esbuildPlugins: [nextJsEsmReplacePlugin, muiIconsEsmReplace, markAsExternalPlugin],
  onSuccess: options.watch ? 'pnpm types' : undefined,
}));
