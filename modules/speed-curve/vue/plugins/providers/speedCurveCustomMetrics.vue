<template>
  <slot />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // @ts-ignore
  if (window.$speedCurveServerRequests) {
    // @ts-ignore
    for (const request of window.$speedCurveServerRequests.requests) {
      // @ts-ignore
      window.LUX.addData(`SSR_${request[0]}`, request[1])
    }
    // @ts-ignore
    window.LUX.addData('SSR_RequestsTotalResponseTime', window.$speedCurveServerRequests.totalTime)
  }
})
</script>
