<template>
  <div class="mt-2 text-sm text-red-600">
    <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
})
</script>
