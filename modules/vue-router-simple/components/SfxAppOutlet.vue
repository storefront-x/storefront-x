<template>
  <Component :is="router.$layout.component" />
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'

const router = useRouter()
</script>
