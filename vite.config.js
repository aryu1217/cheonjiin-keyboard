import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => ({
  root: command === "serve" && mode === "development" ? "playground" : ".",
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.js",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
      cssFileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        exports: "named",
      },
    },
  },
}));
