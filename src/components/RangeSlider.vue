<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { configInputIntervalInterface } from "../types/configInputIntervalInterface.ts";

// Определяем модель для отправки данных в родительский компонент
const modelValue = defineModel<[number, number]>();

const props = defineProps<{
  config: configInputIntervalInterface;
}>();

// Локальные реактивные значения
const lowerValue = ref(props.config.minValue);
const upperValue = ref(props.config.maxValue);

// Функция для проверки корректности значений
function validateValues() {
  // Проверяем, что нижнее значение не больше верхнего минус шаг
  if (lowerValue.value > upperValue.value - props.config.step) {
    lowerValue.value = upperValue.value - props.config.step;
  }

  // Проверяем, что верхнее значение не меньше нижнего плюс шаг
  if (upperValue.value < lowerValue.value + props.config.step) {
    upperValue.value = lowerValue.value + props.config.step;
  }

  // Проверяем границы
  if (lowerValue.value < props.config.minValue) {
    lowerValue.value = props.config.minValue;
  }

  if (upperValue.value > props.config.maxValue) {
    upperValue.value = props.config.maxValue;
  }
}

// Обновление значений при изменении нижнего бегунка
function updateLower(event: Event) {
  const target = event.target as HTMLInputElement;
  lowerValue.value = Number(target.value);
  validateValues();
  updateValues();
}

// Обновление значений при изменении верхнего бегунка
function updateUpper(event: Event) {
  const target = event.target as HTMLInputElement;
  upperValue.value = Number(target.value);
  validateValues();
  updateValues();
}

// Обновление значений в родительский компонент
function updateValues() {
  modelValue.value = [lowerValue.value, upperValue.value];
}

// Вычисление позиций для активного трека
const rangeWidth = computed(
  () => props.config.maxValue - props.config.minValue,
);
const lowerPercent = computed(() => {
  return ((lowerValue.value - props.config.minValue) / rangeWidth.value) * 100;
});
const upperPercent = computed(() => {
  return ((upperValue.value - props.config.minValue) / rangeWidth.value) * 100;
});

// Инициализация значений при монтировании
onMounted(() => {
  if (Array.isArray(modelValue.value) && modelValue.value.length === 2) {
    lowerValue.value = modelValue.value[0];
    upperValue.value = modelValue.value[1];
    validateValues(); // Проверяем корректность начальных значений
  } else {
    modelValue.value = [lowerValue.value, upperValue.value];
  }
});

// Наблюдение за изменениями modelValue
watch(
  modelValue,
  (newVal) => {
    if (Array.isArray(newVal) && newVal.length === 2) {
      lowerValue.value = newVal[0];
      upperValue.value = newVal[1];
      validateValues();
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="w-full py-4">
    <label class="block mb-2 text-sm font-medium">
      {{ config.label }}:
      <span class="ml-2 font-bold">{{ lowerValue }} - {{ upperValue }}</span>
    </label>

    <div class="relative w-full h-10">
      <!-- Базовый трек -->
      <div
        class="absolute w-full h-1 bg-border rounded-full top-1/2 -translate-y-1/2"
      ></div>

      <!-- Активный трек -->
      <div
        class="absolute h-1 bg-text rounded-full top-1/2 -translate-y-1/2"
        :style="{
          left: `${lowerPercent}%`,
          width: `${upperPercent - lowerPercent}%`,
        }"
      ></div>

      <!-- Левый бегунок -->
      <input
        type="range"
        :min="props.config.minValue"
        :max="props.config.maxValue"
        :step="props.config.step"
        :value="lowerValue"
        @input="updateLower"
        class="absolute w-full appearance-none bg-transparent cursor-pointer"
        style="height: 10px; top: 50%; transform: translateY(-50%); z-index: 10"
      />

      <!-- Правый бегунок -->
      <input
        type="range"
        :min="props.config.minValue"
        :max="props.config.maxValue"
        :step="props.config.step"
        :value="upperValue"
        @input="updateUpper"
        class="absolute w-full appearance-none bg-transparent cursor-pointer"
        style="height: 10px; top: 50%; transform: translateY(-50%); z-index: 9"
      />
    </div>
  </div>
</template>

<style scoped>
/* Скрываем стандартные бегунки */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;
}

/* Стилизация бегунков для webkit */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-background);
  border: 2px solid var(--color-text);
  cursor: pointer;
  pointer-events: auto;
  margin-top: -7px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Стилизация бегунков для Firefox */
input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-background);
  border: 2px solid var(--color-text);
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Скрываем стандартный трек */
input[type="range"]::-webkit-slider-runnable-track {
  height: 1px;
  background: transparent;
  border: none;
}

input[type="range"]::-moz-range-track {
  height: 1px;
  background: transparent;
  border: none;
}

/* Убираем фокус */
input[type="range"]:focus {
  outline: none;
}

/* Отключаем выделение */
input[type="range"]::-moz-selection {
  background: transparent;
}

input[type="range"]::selection {
  background: transparent;
}
</style>
