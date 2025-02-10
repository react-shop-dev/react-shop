import { defineConfig } from 'tsup';
import { markAsExternalPlugin } from './../../plugins/mark-as-external';

export default defineConfig(options => ({
  entry: ['./src/cli.ts'],
  format: ['esm', 'cjs'],
  shims: true,
  outDir: 'dist',
  platform: 'node',
  sourcemap: true,
  clean: false,
  minify: true,
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs' }),
  onSuccess: options.watch ? 'pnpm types' : undefined,
  external: ['.bin/next'],
  plugins: [markAsExternalPlugin],
}));
