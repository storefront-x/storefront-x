<template>
  <RouterView v-slot="{ Component: resolved, route }">
    <Suspense @pending="pendingEvent" @resolve="resolveEvent">
      <Component :is="resolved" :key="route.fullPath" />
    </Suspense>
  </RouterView>
</template>

<script setup lang="ts">
import useEventBus from '#ioc/composables/useEventBus.js'

const { emit } = useEventBus('navigation')

function pendingEvent() {
  emit(true)
}
function resolveEvent() {
  emit(false)
}
</script>
