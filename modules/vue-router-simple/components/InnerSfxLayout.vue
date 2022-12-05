<template>
  <Component :is="props.layout" />
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'

const props = defineProps({ layout: { type: Object, required: true }, page: { type: Object, required: true } })
provide(
  '$page',
  computed(() => props.page),
)
</script>
