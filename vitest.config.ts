import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'contentlayer/generated': path.resolve(__dirname, './.contentlayer/generated'),
    },
  },
  test: {
    environment: './src/test/patched-jsdom.environment.ts',
    setupFiles: ['src/test/setupTests.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
    css: true,
  },
});
