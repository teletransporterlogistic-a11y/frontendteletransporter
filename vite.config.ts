import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    open: false
  },
  build: {
    sourcemap: false,
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000
  }
});
