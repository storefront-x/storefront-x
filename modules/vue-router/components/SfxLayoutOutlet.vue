<template>
  <RouterView v-slot="{ Component, route }">
    <Suspense @pending="onPending" @resolve="onResolve">
      <Component :is="Component" :key="route.path" />
    </Suspense>
  </RouterView>
</template>

<script setup lang="ts">
import useEventBus from '#ioc/composables/useEventBus.js'

const { emit } = useEventBus('navigation')

const onPending = () => emit(true)

const onResolve = () => emit(false)
</script>
