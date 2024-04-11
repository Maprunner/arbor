/* eslint-disable */
import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/arbor/",
    build: {
      outDir: "./dist",
      emptyOutDir: true,
      minify: "esbuild",
      manifest: true,
      sourcemap: true,
    },
    resolve: {
      alias: {
        "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      },
    },
    server: {
      origin: "http://localhost",
      port: 5173,
      // needed for vite and Cypress to work together
      // see https://stackoverflow.com/questions/72324704/cypress-cant-load-assets-from-vites-devserver
      host: "127.0.0.1",
      strictPort: true,
      hot: true,
      hmr: {
        port: 5174,
        host: "127.0.0.1",
      },
      // redirects API calls to XAMPP server in development environment
      proxy: {
        "/api": {
          target: "http://localhost/arbor",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port: 5173,
      strictPort: true,
    },
    open: true,
    plugins: [react()],
  }
})
