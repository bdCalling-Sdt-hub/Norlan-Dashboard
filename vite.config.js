import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonJsOptions: { transformMixedEsModules: true }
  },
  server: {
    host: "192.168.10.195",
    port: "3001",
  },
});
