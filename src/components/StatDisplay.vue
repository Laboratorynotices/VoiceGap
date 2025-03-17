<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  // Исходный текст, который нужно проанализировать
  rawData: string;
}>();

// Создаем вычисляемые свойства для подсчета количества символов и слов
const charsCount = computed(() => props.rawData.length);
const wordsCount = computed(() => props.rawData.split(/\s+/).length);
// Создаем вычисляемое свойство для подсчета времени диктанта
const dictationTime = computed(() => {
  // Предполагаем, что ребёнок пишет один знак за 2 секунды, или 0.5 знака в секунду
  const charsPerSecond = 0.5;
  // Округляем в большую сторону, чтобы учесть неполные минуты
  return Math.ceil(charsCount.value / charsPerSecond / 60);
});
</script>

<template>
  <div>
    <h2>Статистика</h2>

    <div>
      <label>Количество слов: </label>
      <span>{{ wordsCount }}</span>
    </div>

    <div>
      <label>Количество символов: </label>
      <span>{{ charsCount }}</span>
    </div>

    <div>
      <label>Время для диктанта: </label>
      <span>{{ dictationTime }} мин</span>
    </div>
  </div>
</template>
