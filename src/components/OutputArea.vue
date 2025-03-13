<script setup lang="ts">
defineProps<{ outputData: string }>();
</script>

<template>
  <p>Получено из родителя: {{ outputData }}</p>
</template>
