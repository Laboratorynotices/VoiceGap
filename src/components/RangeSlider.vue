<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";
import type { configInputIntervalInterface } from "../types/configInputIntervalInterface.ts";

// Определяем модель для отправки данных в родительский компонент
const modelValue = defineModel<[number, number]>();

const props = defineProps<{
  config: configInputIntervalInterface;
}>();

// Локальные реактивные значения
const lowerValue = ref((modelValue.value as [number, number])[0]);
const upperValue = ref((modelValue.value as [number, number])[1]);

// Обновление значения при изменении бегунков
function updateValue() {
  modelValue.value = [lowerValue.value, upperValue.value];
}

// Вычисляемые границы для бегунков
const lowerMax = computed(() => +upperValue.value - props.config.step);
const upperMin = computed(() => +lowerValue.value + props.config.step);
</script>

<template>
  <div>
    <label>{{ config.label }}:</label>
    <input
      type="range"
      v-model="lowerValue"
      :min="config.minValue"
      :max="lowerMax"
      :step="config.step"
      @input="updateValue"
    />
    <input
      type="range"
      v-model="upperValue"
      :min="upperMin"
      :max="config.maxValue"
      :step="config.step"
      @input="updateValue"
    />
    <span>{{ lowerValue }} - {{ upperValue }}</span>
  </div>
</template>
