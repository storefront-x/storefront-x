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
  for (let index = 0; index < bindedErrorHandlers.length; index++) {
    const errorHandler = bindedErrorHandlers[index]

    try {
      errorHandler(currentError)
      // Prevent propagation
      return false
    } catch (error: any) {
      // console.log('catch', { errorInCantch: error })
      currentError = error
      continue
    }
  }

  ctx.errorCaptured = currentError
})
</script>
