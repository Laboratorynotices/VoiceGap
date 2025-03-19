import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
// mode - текущий режим
// (по умолчанию "development" для dev и
// "production" для build)
export default defineConfig(({ mode }) => ({
  plugins: [vue(), tailwindcss()], // Имя репозитория на GitHub - VoiceGap
  base: mode === "production" ? "/VoiceGap/" : "/",
  build: {
    // Путь, куда будет генерироваться сборка,
    // на GitHub Pages это будет папка docs
    outDir: "docs",
  }, // Для Vite SSG
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    // Для SPA нам нужна только корневая страница
    includedRoutes: () => ["/"],
    format: "cjs",
    entry: "/src/main.ts",
  },
}));
