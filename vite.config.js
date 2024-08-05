import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
// import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig(({ mode}) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/features/catalog/components"),
        "@pages": path.resolve(__dirname, "src/features/catalog/pages"),
        "@routes": path.resolve(__dirname, "src/features/catalog/routes"),
        "@data": path.resolve(__dirname, "src/data")
      }
    }
  }
})
 