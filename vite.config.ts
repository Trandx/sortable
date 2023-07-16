import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'Sortable',
      fileName: 'index',
      formats: ["es", "cjs", "umd", "iife"],
    },
    minify: "esbuild"
    
  }
})
