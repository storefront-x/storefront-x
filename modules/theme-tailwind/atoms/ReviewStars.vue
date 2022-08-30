<template>
  <div class="flex items-center">
    <SolidStarIcon v-for="i in stars" :key="'1' + i" class="h-5 w-5 flex-shrink-0 text-primary-500" />
    <SolidStarIcon v-for="i in greyStars" :key="'2' + i" class="h-5 w-5 flex-shrink-0 text-gray-300" />
    <span v-if="count !== null" class="ml-8 text-sm">{{ count }} x</span>
  </div>
</template>

<script setup lang="ts">
import SolidStarIcon from '#ioc/icons/SolidStarIcon'
import { computed } from 'vue'

const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: null,
  },
})

const stars = computed(() => {
  return Math.round((5 * props.rating) / 100)
})

const greyStars = computed(() => {
  return 5 - stars.value
})
</script>
