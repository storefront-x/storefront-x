<template>
  <Banner :el="el" :index="index" />
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import Banner from './pb-banner.vue'

defineProps({
  el: {
    type: Object as PropType<HTMLElement>,
    default: null,
  },
  index: {
    type: Number,
    default: -1,
  },
})
</script>
