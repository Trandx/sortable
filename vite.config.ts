import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: false,
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
    
  },
  test:{
    environment: 'edge-runtime'
  }
})
