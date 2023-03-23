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
  let errorOnHandling = e

  for (let index = 0; index < bindedErrorHandlers.length; index++) {
    const errorHandler = bindedErrorHandlers[index]

    try {
      errorHandler(errorOnHandling)
      // Prevent propagation
      return false
    } catch (error) {
      if (error !== errorOnHandling) {
        errorOnHandling = error
        index = 0
        continue
      }
      continue
    }
  }

  ctx.errorCaptured = errorOnHandling
})
</script>
