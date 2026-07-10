import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      '@brand': path.resolve(__dirname, '../../packages/brand'),
      '@policy-ui': path.resolve(__dirname, '../../packages/policy-ui/src'),
      '@schemas': path.resolve(__dirname, '../../packages/schemas')
    }
  },
  build: {
    outDir: path.resolve(__dirname, './dist'),
    emptyOutDir: true
  }
});
