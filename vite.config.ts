import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    eslintPlugin({
      cache: false,
    }),
    vueJsx({
      // 配置选项
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '/assets': 'src/assets',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
})
