<template>
  <slot />
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import errorHandlers from '~/.sfx/vue/errorHandlers'

const bindedErrorHandlers = Object.values(errorHandlers).map((e) => e())
onErrorCaptured((e) => {
  let wasCaught = false
  for (const errorHandler of bindedErrorHandlers) {
    try {
      errorHandler(e)
      wasCaught = true
    } catch {
      continue
    }
  }
  if (wasCaught) return false
})
</script>
