<template>
  <Suspense @pending="pendingEvent" @resolve="resolveEvent">
    <Component :is="router.$page.component" />
  </Suspense>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'
import useEventBus from '#ioc/composables/useEventBus.js'

const router = useRouter()

const { emit } = useEventBus('navigation')

function pendingEvent() {
  emit(true)
}

function resolveEvent() {
  emit(false)
}
</script>
