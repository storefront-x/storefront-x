<template>
  <label class="block text-sm font-medium text-gray-700">
    <slot />
    <span v-if="required" class="text-red-600 ml-1">*</span>
  </label>
</template>

<script setup lang="ts">
defineProps({
  required: {
    type: Boolean,
    default: false,
  },
})
</script>
