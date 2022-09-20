<template>
  <div
    class="rounded-lg whitespace-nowrap px-2 pb-px bg-gray-500 text-white font-semibold text-xs"
    :style="label.style"
  >
    {{ label.text }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: Object,
    default: null,
  },
})
</script>
