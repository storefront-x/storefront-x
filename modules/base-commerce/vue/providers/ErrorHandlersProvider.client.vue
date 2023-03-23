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
  let wasCaught = false

  for (const errorHandler of bindedErrorHandlers) {
    try {
      errorHandler(e.reason)
      wasCaught = true
    } catch {
      continue
    }
  }

  if (wasCaught) e.preventDefault()
})

onErrorCaptured((e) => {
  let errorOnHandling = e
  let wasCaught = false

  for (let index = 0; index < bindedErrorHandlers.length; index++) {
    const errorHandler = bindedErrorHandlers[index]

    try {
      errorHandler(errorOnHandling)
      wasCaught = true
    } catch (error) {
      if (error !== errorOnHandling) {
        errorOnHandling = error
        index = 0
        continue
      }
      continue
    }
  }

  if (wasCaught) return false
})
</script>
