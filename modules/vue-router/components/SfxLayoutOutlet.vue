<template>
  <RouterView v-slot="{ Component: resolved, route }">
    <Suspense @pending="pendingEvent(true)" @resolve="resolveEvent(false)">
      <Component :is="resolved" :key="route.fullPath" />
    </Suspense>
  </RouterView>
</template>

<script setup lang="ts">
import useEmitNavigation from '#ioc/bus/emitters/useEmitNavigation'

const emitNavigation = useEmitNavigation()

function pendingEvent(isLoading: boolean) {
  emitNavigation({ isLoading })
}
function resolveEvent(isLoading: boolean) {
  emitNavigation({ isLoading })
}
</script>
