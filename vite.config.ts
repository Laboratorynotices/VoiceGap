import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // Имя репозитория на GitHub
  base: "/VoiceGap/",
  build: {
    // Путь, куда будет генерироваться сборка,
    // а на GitHub Pages это будет папка docs
    outDir: "docs",
  },
});
