import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// mode - текущий режим
// (по умолчанию "development" для dev и
// "production" для build)
export default defineConfig(({ mode }) => ({
  plugins: [vue(), tailwindcss()],
  // Имя репозитория на GitHub - VoiceGap
  base: mode === "production" ? "/VoiceGap/" : "/",
  build: {
    // Путь, куда будет генерироваться сборка,
    // на GitHub Pages это будет папка docs
    outDir: "docs",
  },
}));
