import { defineConfig } from 'tsup';
import { markAsExternalPlugin } from '../../plugins/mark-as-external';

export default defineConfig(options => ({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  platform: 'node',
  sourcemap: true,
  clean: false,
  minify: true,
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.mjs' }),
  onSuccess: options.watch ? 'pnpm types' : undefined,
  esbuildPlugins: [markAsExternalPlugin],
}));
