import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import createVitePlugins from './vite/plugins'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV, VITE_OUT_DIR, VITE_APP_BASE_URL } = env
  return {
    base: VITE_APP_ENV === 'production' ? VITE_OUT_DIR : '/',
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      port: 81,
      host: false,
      open: true,
      proxy: {
        '/api': {
          target: VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: p => p.replace(/^\/api/, '')
        }
      }
    },
    build: {
      cssCodeSplit: false,
      sourcemap: false,
      outDir: VITE_OUT_DIR,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                id.includes('vue') ||
                id.includes('vue-router') ||
                id.includes('pinia') ||
                id.includes('element-plus')
              ) {
                return 'vue'
              }

              if (id.includes('echarts')) {
                return 'echarts'
              }

              return 'vendor'
            }
          }
        }
      }
    }
  }
})
