<script setup lang="ts">
// Определяем модель для поля ввода
const inputValue = defineModel<string>();
</script>

<template>
  <textarea v-model="inputValue" placeholder="Введите текст"></textarea>
</template>
