<template>
  <Suspense @pending="pendingEvent" @resolve="resolveEvent">
    <Component :is="targetComponent" :key="router.$pathMatch" :resolve-path="router.$pathMatch" />
  </Suspense>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'
import useEventBus from '#ioc/composables/useEventBus.js'
import { watchEffect, shallowRef } from 'vue'

const router = useRouter()
const targetComponent = shallowRef()
const { emit } = useEventBus('navigation')

watchEffect(() => {
  targetComponent.value = router.$page.component
})

function pendingEvent() {
  emit(true)
}

function resolveEvent() {
  emit(false)
}
</script>
