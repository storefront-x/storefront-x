<template>
  <slot />
</template>

<script setup lang="ts">
import useEventBus from '#ioc/composables/useEventBus'
import NPROGRESS_BAR_TRICKLE_SPEED from '#ioc/config/NPROGRESS_BAR_TRICKLE_SPEED'
import NProgress from 'nprogress'

const { listen } = useEventBus('navigation')

listen((isLoading) => {
  if (isLoading) {
    NProgress.configure({ trickleSpeed: NPROGRESS_BAR_TRICKLE_SPEED })
    NProgress.start()
  } else {
    NProgress.done()
  }
})
</script>
