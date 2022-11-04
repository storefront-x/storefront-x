<template>
  <slot />
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import errorHandlers from '~/.sfx/vue/errors'

const bindedErrorHandlers = Object.values(errorHandlers).map((e) => e())
onErrorCaptured((e) => {
  for (const errorHandler of bindedErrorHandlers) {
    try {
      errorHandler(e)
      return false
    } catch {
      continue
    }
  }
})
</script>
