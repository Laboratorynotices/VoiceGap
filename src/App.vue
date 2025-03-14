<script setup lang="ts">
import { computed, ref } from "vue";
import InputArea from "./components/InputArea.vue";
import OutputArea from "./components/OutputArea.vue";

// Определяем модель для поля ввода
const rawData = ref("");

//(0.5s to 5s) интервал разрешённых пауз между словами
const PAUSE_INTERVAL_MIN = 0.5 as const;
const PAUSE_INTERVAL_MAX = 5 as const;

// Сколько букв в слове для минимальной паузы
const MIN_WORD_LENGTH = 3 as const;
// Сколько букв в слове для максимальной паузы
const MAX_WORD_LENGTH = 10 as const;

// Функция для расчета времени паузы на основе длины слова
const calculatePauseTime = (wordLength: number) => {
  // Ограничиваем длину слова в пределах MIN_WORD_LENGTH и MAX_WORD_LENGTH
  const clampedLength = Math.max(
    MIN_WORD_LENGTH,
    Math.min(wordLength, MAX_WORD_LENGTH),
  );

  // Рассчитываем время с линейной интерполяцией
  const pauseRange = PAUSE_INTERVAL_MAX - PAUSE_INTERVAL_MIN;
  const lengthRange = MAX_WORD_LENGTH - MIN_WORD_LENGTH;

  // Вычисляем нормализованную позицию длины слова в диапазоне (0-1)
  const normalizedPosition =
    lengthRange > 0 ? (clampedLength - MIN_WORD_LENGTH) / lengthRange : 0;

  // Интерполируем паузу между PAUSE_INTERVAL_MIN и PAUSE_INTERVAL_MAX
  const pauseTime = PAUSE_INTERVAL_MIN + normalizedPosition * pauseRange;

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
  <div class="border-1 lg:col-span-2 2xl:col-span-5 order-last">
    Описание приложения для
    <a href="https://luvvoice.com/" target="_blank">luvvoice.com</a>.
  </div>
  <div class="border-1 lg:col-span-2 2xl:col-span-5">Шапка</div>
  <InputArea class="border-1 2xl:col-span-2 2xl:row-span-2" v-model="rawData" />
  <OutputArea
    class="border-1 2xl:col-span-2 2xl:row-span-2 bg-input dark:bg-dark-input"
    :outputData="outputData"
  />
  <div class="border-1 lg:col-span-2 2xl:col-span-1">Статистика</div>
  <div class="border-1 lg:col-span-2 2xl:col-span-1">Настройки</div>
</template>
