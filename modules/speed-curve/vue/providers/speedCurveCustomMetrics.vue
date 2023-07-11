<template>
  <slot />
</template>

<script setup lang="ts">
// @ts-nocheck
import { onMounted } from 'vue'
import useAddSpeedCurveCustomMetrics from '#ioc/composables/useAddSpeedCurveCustomMetrics'

const addSpeedCurveCustomMetrics = useAddSpeedCurveCustomMetrics()

onMounted(() => {
  if (window.$speedCurveServerRequests) {
    for (const request of window.$speedCurveServerRequests.requests) {
      addSpeedCurveCustomMetrics(`SSR_${request[0]}`, request[1])
    }
    addSpeedCurveCustomMetrics('SSR_RequestsTotalResponseTime', window.$speedCurveServerRequests.totalTime)
  }
})
</script>
