import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envDir = path.join(__dirname, '../')
  const env = loadEnv(mode, envDir, '')
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('../shared', import.meta.url))
      }
    },
    envDir,
    server: {
      proxy: {
        '/api': {
          target: `http://localhost:${env.VITE_SERVER_PORT}`,
          changeOrigin: true
        }
      }
    }
  }
})
