import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import "./style.css";

// Простая конфигурация для SPA без реальной маршрутизации
export const createApp = ViteSSG(
  App, // Базовая конфигурация роутера (минимальная для работы vite-ssg)
  {
    base: import.meta.env.BASE_URL,
    routes: [
      {
        path: "/",
        component: App,
      },
    ],
  },
  (ctx) => {
    // здесь можно добавить плагины и т.д.
  },
);
