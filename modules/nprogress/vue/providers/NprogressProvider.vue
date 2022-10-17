<template>
  <slot />
</template>

<script setup lang="ts">
import useEventBus from '#ioc/composables/useEventBus.js'
import NProgress from 'nprogress'
const { listen } = useEventBus('navigation')

listen((isLoading) => {
  if (isLoading) {
    NProgress.start()
  } else {
    NProgress.done()
  }
})
</script>
