import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "206.189.231.81",
    // host: "192.168.10.195",
    port: 3000,
  },
});
