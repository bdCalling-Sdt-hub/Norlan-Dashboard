import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonJsOptions: { transformMixedEsModules: true }
  },
  server: {
    host: "104.248.15.129",
    port: "3000",
  },
});
