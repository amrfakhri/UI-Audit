import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2019',
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        code: 'src/code.ts'
      },
      output: {
        entryFileNames: 'code.js'
      }
    }
  }
});