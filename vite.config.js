import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === "production" ? "/torps-fpl/" : "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const moduleName = id.split("node_modules/")[1].split("/")[1]
            return `vendor/${moduleName}`
          }
        },
        chunkFileNames: "js/[name]-[hash].js",
      },
    },
  },
})
