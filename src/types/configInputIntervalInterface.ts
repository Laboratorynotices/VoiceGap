/**
 * Интерфейс для передачи данных в компонент InputInterval,
 * для настройки интервала значений
 */
export interface configInputIntervalInterface {
  minValue: number; // минимальное значение
  maxValue: number; // максимальное значение
  step: number; // шаг
  label: string; // название
}
