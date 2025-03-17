<script setup lang="ts">
import { computed, ref } from "vue";
import InstructionPanel from "./components/InstructionPanel.vue";
import SiteHeader from "./components/SiteHeader.vue";
import InputArea from "./components/InputArea.vue";
import OutputArea from "./components/OutputArea.vue";
import PauseConfigurator from "./components/PauseConfigurator.vue";
import StatDisplay from "./components/StatDisplay.vue";
import type { configSettingsInterface } from "./types/configSettingsInterface";

// Определяем модель для поля ввода
const rawData = ref("");

// Настройка для определения длины слов и пауз между ними
const config = ref<configSettingsInterface>({
  // от 3 до 10 букв - интервал длины слов
  wordLength: [3, 10],
  // (от 0.5s до 5s) интервал пауз между словами
  pauseLength: [0.5, 5],
});

// Функция для расчета времени паузы на основе длины слова
const calculatePauseTime = (wordLength: number) => {
  // Ограничиваем длину слова в пределах интервала config.value.wordLength
  const clampedLength = Math.max(
    config.value.wordLength[0],
    Math.min(wordLength, config.value.wordLength[1]),
  );

  // Рассчитываем время с линейной интерполяцией
  const pauseRange = config.value.pauseLength[1] - config.value.pauseLength[0];
  const lengthRange = config.value.wordLength[1] - config.value.wordLength[0];

  // Вычисляем нормализованную позицию длины слова в диапазоне (0-1)
  const normalizedPosition =
    lengthRange > 0
      ? (clampedLength - config.value.wordLength[0]) / lengthRange
      : 0;

  // Интерполируем паузу между двумя граничными значениями разрешенного диапазона пауз
  const pauseTime =
    +config.value.pauseLength[0] + normalizedPosition * pauseRange;

  // Округляем до одного десятичного знака
  return Math.round(pauseTime * 10) / 10;
};

// Создаем вычисляемое свойство с заменой пробелов и подсчетом букв в словах
const outputData = computed(() => {
  return (
    rawData.value
      // Перед каждым переносом строки добавляем пробел
      .replace(/\n/g, " \n")
      // Разбиваем строку по пробелам
      .split(" ")
      // Добавляем время для каждого слова
      .map((word) =>
        // Из слова убираем перенос строки и проверяем, что осталось
        word.replace(/\n/g, "")
          ? // Если получившееся слово не пустое, добавляем время
            `${word} (⏱️=${calculatePauseTime(word.length)}s)`
          : // Иначе возвращаем оригинальное слово (перенос строки или ничего)
            word,
      )
      // Обратно соединяем в строку
      .join(" ")
  );
});
</script>

<template>
  <InstructionPanel class="border-1 lg:col-span-2 2xl:col-span-5 order-last" />
  <SiteHeader class="border-1 lg:col-span-2 2xl:col-span-5" />
  <InputArea class="border-1 2xl:col-span-2 2xl:row-span-2" v-model="rawData" />
  <OutputArea
    class="border-1 2xl:col-span-2 2xl:row-span-2 bg-input dark:bg-dark-input"
    :outputData="outputData"
  />
  <StatDisplay
    class="border-1 lg:col-span-2 2xl:col-span-1"
    :rawData="rawData"
  />
  <PauseConfigurator
    class="border-1 lg:col-span-2 2xl:col-span-1"
    v-model="config"
  />
</template>
