<template>
  <Suspense @pending="pendingEvent" @resolve="resolveEvent">
    <Component :is="targetComponent" v-if="router.$resolved" />
    <div v-else>LOADING</div>
  </Suspense>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'
import useEventBus from '#ioc/composables/useEventBus.js'
import { watchEffect, shallowRef } from 'vue'
const router = useRouter()
const targetComponent = shallowRef()
watchEffect(() => {
  targetComponent.value = router.$page.component
  // console.log({ LAYOUT_ROUTE_PATH: router.$path })
  // console.log({ LAYOUT_ROUTE_COMPONENT: router.$page.component })
})
const { emit } = useEventBus('navigation')

function pendingEvent() {
  emit(true)
}

function resolveEvent() {
  emit(false)
}
</script>
