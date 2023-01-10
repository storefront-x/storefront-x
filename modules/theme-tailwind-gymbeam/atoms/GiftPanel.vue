<template>
  <div class="border-t border-b divide-y divide-gray-100 mt-8 mb-2">
    <div class="flex row py-4">
      <img :src="src" alt="Gift" class="h-16 w-auto mr-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
const src = '/images/gift_image.svg'
</script>
