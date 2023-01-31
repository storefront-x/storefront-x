<template>
  <RouterView v-slot="{ Component: resolved, route }">
    <Suspense @pending="pendingEvent" @resolve="resolveEvent">
      <Component :is="resolved" :key="route.fullPath" />
    </Suspense>
  </RouterView>
</template>

<script setup lang="ts">
import useEmitNavigationStart from '#ioc/bus/emitters/useEmitNavigationStart'
import useEmitNavigationEnd from '#ioc/bus/emitters/useEmitNavigationEnd'

const emitNavigationStart = useEmitNavigationStart()
const emitNavigationEnd = useEmitNavigationEnd()

function pendingEvent() {
  emitNavigationStart({})
}
function resolveEvent() {
  emitNavigationEnd({})
}
</script>
