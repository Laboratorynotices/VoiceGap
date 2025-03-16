<script setup lang="ts">
import { ref } from "vue";
import type { configSettingsInterface } from "../types/configSettingsInterface";

// Определяем модель для отправки данных в родительский компонент
const config = defineModel<configSettingsInterface>();

// Определение граничных состояний и шагов для инпута
// Для длины слов
const WORD_LENGTH_INPUT = {
  minValue: 1,
  maxValue: 20,
  step: 1,
} as const;
// Для длины пауз
const PAUSE_LENGTH_INPUT = {
  minValue: 0.5,
  maxValue: 5,
  step: 0.5,
} as const;

// Локальные реактивные состояния для бегунков
const wordLength = ref<[number, number]>([1, 20]);
const pauseLength = ref<[number, number]>([1, 5]);

// Обновление конфигурации при изменении бегунков
function updateConfig() {
  config.value = {
    wordLength: wordLength.value,
    pauseLength: pauseLength.value,
  };
}

// Проверка переданной конфигурации от родительского компонента
if (!config.value) {
  // Если конфигурация не передана, устанавливаем значения по умолчанию
  config.value = {
    wordLength: wordLength.value,
    pauseLength: pauseLength.value,
  };
} else {
  // Если конфигурация передана, устанавливаем значения из неё
  wordLength.value = config.value.wordLength;
  pauseLength.value = config.value.pauseLength;
}
</script>

<template>
  <div>
    <h2>Настройки</h2>

    <div>
      <label>Длина слов: </label>
      <input
        type="range"
        v-model="wordLength[0]"
        :min="WORD_LENGTH_INPUT.minValue"
        :max="+wordLength[1] - WORD_LENGTH_INPUT.step"
        :step="WORD_LENGTH_INPUT.step"
        @input="updateConfig"
      />
      <input
        type="range"
        v-model="wordLength[1]"
        :min="+wordLength[0] + WORD_LENGTH_INPUT.step"
        :max="WORD_LENGTH_INPUT.maxValue"
        :step="WORD_LENGTH_INPUT.step"
        @input="updateConfig"
      />
      <span>{{ wordLength[0] }} - {{ wordLength[1] }}</span>
    </div>

    <div>
      <label>Длина пауз: </label>
      <input
        type="range"
        v-model="pauseLength[0]"
        :min="PAUSE_LENGTH_INPUT.minValue"
        :max="+pauseLength[1] - PAUSE_LENGTH_INPUT.step"
        :step="PAUSE_LENGTH_INPUT.step"
        @input="updateConfig"
      />
      <input
        type="range"
        v-model="pauseLength[1]"
        :min="+pauseLength[0] + PAUSE_LENGTH_INPUT.step"
        :max="PAUSE_LENGTH_INPUT.maxValue"
        :step="PAUSE_LENGTH_INPUT.step"
        @input="updateConfig"
      />
      <span>{{ pauseLength[0] }} - {{ pauseLength[1] }}</span>
    </div>
  </div>
</template>
