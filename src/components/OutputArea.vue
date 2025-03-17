<script setup lang="ts">
defineProps<{ outputData: string }>();
</script>

<template>
  <textarea placeholder="Результат" readonly>{{ outputData }}</textarea>
</template>
