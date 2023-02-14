<template>
  <slot />
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import errorHandlers from '~/.sfx/vue/errorHandlers.server'
import useContext from '#ioc/composables/useContext'

const ctx = useContext()
const bindedErrorHandlers = Object.values(errorHandlers)
  .map((e) => e())
  .reverse()

onErrorCaptured((e) => {
  for (const errorHandler of bindedErrorHandlers) {
    try {
      errorHandler(e)
      // Prevent propagation
      return false
    } catch {
      continue
    }
  }

  ctx.errorCaptured = e
})
</script>
