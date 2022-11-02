<template>
  <slot />
</template>

<script setup lang="ts">
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useEventBus from '#ioc/composables/useEventBus.js'
import NProgress from 'nprogress'

const { listen } = useEventBus('navigation')

if (IS_CLIENT) {
  listen((isLoading) => {
    if (isLoading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  })
}
</script>
