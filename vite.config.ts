import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      eslintOptions: {
        cache: false, // 禁用缓存
      },
    }),
    vueJsx({
      // 配置选项
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variable.scss;"',
      },
    },
  },
})
