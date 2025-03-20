<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ outputData: string }>();
const showCopied = ref(false);

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.outputData as string);
  showCopied.value = true;

  setTimeout(() => {
    showCopied.value = false;
  }, 2000);
};
</script>

<template>
  <div class="relative">
    <textarea placeholder="Результат" readonly class="w-full h-full">{{
      props.outputData
    }}</textarea>

    <div class="absolute top-2 right-2">
      <button
        @click="copyToClipboard"
        class="p-1 hover:bg-gray-100 rounded"
        title="Копировать в буфер обмена"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500 hover:text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          />
        </svg>
      </button>

      <div
        v-if="showCopied"
        class="absolute top-0 right-7 text-xs text-green-600 bg-white px-1 py-0.5 rounded shadow"
      >
        Скопировано!
      </div>
    </div>
  </div>
</template>
