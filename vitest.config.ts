import { defineConfig, defaultExclude } from 'vitest/config';
import { alias } from './test/alias';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, './test/vitest.setup.ts')],
    include: ['src/**/*.{spec,test}.{ts,tsx}'],
    exclude: [...defaultExclude],
    coverage: {
      provider: 'v8',
      reportsDirectory: path.resolve(__dirname, './test/coverage'),
    },
    globals: true,
    mockReset: true,
    alias,
  },
  resolve: {
    alias,
  },
});
