/**
 * Интерфейс для передачи данных между App.vue и ConfigArea.vue
 * Передаются настройки для генерации пауз в тексте
 */
export interface configSettingsInterface {
  wordLength: [number, number]; // [минимальная длина, максимальная длина]
  pauseLength: [number, number]; // [минимальная пауза, максимальная пауза]
}
