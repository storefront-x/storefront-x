<template>
  <Heading :level="1" data-cy="title">{{ brand.name }}</Heading>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'

defineProps({
  brand: {
    type: Object,
    default: () => ({}),
  },
})
</script>
