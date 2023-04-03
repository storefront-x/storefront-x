<template>
  <slot />
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import errorHandlers from '~/.sfx/vue/errorHandlers.client'

const bindedErrorHandlers = Object.values(errorHandlers)
  .map((e) => e())
  .reverse()

window.addEventListener('unhandledrejection', (e) => {
  let currentError = e.reason

  for (const errorHandler of bindedErrorHandlers) {
    try {
      errorHandler(currentError)
      return e.preventDefault()
    } catch (e: any) {
      currentError = e
      continue
    }
  }

  throw currentError
})

onErrorCaptured((e) => {
  let currentError = e

  for (const errorHandler of bindedErrorHandlers) {
    try {
      errorHandler(currentError)
      return false
    } catch (e: any) {
      currentError = e
      continue
    }
  }

  throw currentError
})
</script>
