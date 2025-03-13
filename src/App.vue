<script setup lang="ts">
import { ref } from "vue";
import InputArea from "./components/InputArea.vue";
import OutputArea from "./components/OutputArea.vue";

const rawData = ref("");
</script>

<template>
  <div class="border-1 lg:col-span-2 2xl:col-span-5 order-last">
    Описание приложения
  </div>
  <div class="border-1 lg:col-span-2 2xl:col-span-5">Шапка</div>
  <InputArea class="border-1 2xl:col-span-2 2xl:row-span-2" v-model="rawData" />
  <OutputArea
    class="border-1 2xl:col-span-2 2xl:row-span-2 bg-input dark:bg-dark-input"
    :outputData="rawData"
  />
  <div class="border-1 lg:col-span-2 2xl:col-span-1">Статистика</div>
  <div class="border-1 lg:col-span-2 2xl:col-span-1">Настройки</div>
</template>
