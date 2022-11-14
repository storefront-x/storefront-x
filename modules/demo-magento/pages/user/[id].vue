<template>
  <div>{{ route.params }}</div>
</template>

<script setup lang="ts">
import useRoute from '#ioc/composables/useRoute'

const route = useRoute()
</script>
