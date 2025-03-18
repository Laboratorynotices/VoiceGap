<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type { configSettingsInterface } from "../types/configSettingsInterface.ts";
import type { configInputIntervalInterface } from "../types/configInputIntervalInterface.ts";
import RangeSlider from "./RangeSlider.vue";

// Определяем модель для отправки данных в родительский компонент
const config = defineModel<configSettingsInterface>();

// Определение граничных состояний и шагов для инпута
// Для длины слов
const WORD_LENGTH_INPUT: configInputIntervalInterface = {
  minValue: 1,
  maxValue: 20,
  step: 1,
  label: "Длина слов",
} as const;
// Для длины пауз
const PAUSE_LENGTH_INPUT: configInputIntervalInterface = {
  minValue: 0.5,
  maxValue: 5,
  step: 0.5,
  label: "Длина пауз",
} as const;

// Локальные реактивные состояния для бегунков
const wordLength = ref<[number, number]>([3, 10]);
const pauseLength = ref<[number, number]>([0.5, 5]);

// Обновление конфигурации при изменении бегунков
watchEffect(() => {
  config.value = {
    wordLength: wordLength.value,
    pauseLength: pauseLength.value,
  };
});
</script>

<template>
  <div>
    <h2>Настройки</h2>

    <RangeSlider v-model="wordLength" :config="WORD_LENGTH_INPUT" />

    <RangeSlider v-model="pauseLength" :config="PAUSE_LENGTH_INPUT" />
  </div>
</template>
