import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from 'vite-plugin-compression'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore eslint-ignore
import eslintPlugin from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    imports: ["vue", "vue-router", "pinia"],
    eslintrc: {
      enabled: true, 
      filepath: './.eslintrc-auto-import.js',
      globalsPropValue: 'readonly',
    },
    dts: "src/auto-imports.d.ts",
  }),
  Components({}),
  eslintPlugin({
    include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
    exclude: ['node_modules/**', 'dist/**'],    // 指定不需要检查的文件
    fix: true,    // 是否自动修复
    cache: false    // 是否启用缓存
  }),
  viteCompression({
    // threshold: 10240 ,
    algorithm: 'gzip',
    // deleteOriginFile: false, // 不删除源文件// 对大于 1mb 的文件进行压缩
  }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),

    }
  },
  server:{
    port:8084,
  },
  build: {
    sourcemap: false,
    minify: "terser",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    reportCompressedSize:false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output:{
        manualChunks(id) {
          if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split("/")[1].toString()
          }
      }
    }
    },
  },
})
