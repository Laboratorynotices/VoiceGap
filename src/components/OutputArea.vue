<script setup lang="ts">
defineProps<{ outputData: string }>();
</script>

<template>
  <pre>{{ outputData }}</pre>
</template>
