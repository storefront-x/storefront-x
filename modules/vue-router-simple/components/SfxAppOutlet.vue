<template>
  <Suspense>
    <Component :is="router.$layout.component" />
  </Suspense>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'

const router = useRouter()
</script>
