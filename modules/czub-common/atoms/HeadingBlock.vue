<template>
  <div class="overflow-hidden text-center">
    <h3 class="text-primary-500 uppercase text-5xl font-bold my-8">{{ title }}</h3>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
<style scoped>
h3:before,
h3:after {
  @apply relative inline-block w-1/2 h-[1px] content-[''] align-middle bg-primary-750 bg-opacity-[0.18];
}
h3:before {
  @apply right-[30px] -ml-[100%];
}
h3:after {
  @apply left-[30px] -mr-[100%];
}
</style>
