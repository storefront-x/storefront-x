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
  let wasCaught = false

  for (const errorHandler of bindedErrorHandlers) {
    try {
      errorHandler(e)
      wasCaught = true
    } catch {
      continue
    }
  }
  if (wasCaught) {
    return false
  } else {
    ctx.errorCaptured = e
    return true
  }
})
</script>
