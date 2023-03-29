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
  let currentError = e

  for (const errorHandler of bindedErrorHandlers) {
    try {
      errorHandler(currentError)
      // Prevent propagation
      return false
    } catch (e: any) {
      currentError = e
      continue
    }
  }

  ctx.errorCaptured = currentError
  // Re-trhow current error so that Vue does not propagate the old one
  throw currentError
})
</script>
