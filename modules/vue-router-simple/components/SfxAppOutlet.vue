<template>
  <Suspense @pending="pendingEvent" @resolve="resolveEvent">
    <InnerSfxLayout
      :key="router.$pathMatch"
      :layout="router.$view.layout.component"
      :page="router.$view.page.component"
    />
  </Suspense>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'
import useEventBus from '#ioc/composables/useEventBus'
import InnerSfxLayout from '#ioc/components/InnerSfxLayout'

const router = useRouter()

const { emit } = useEventBus('navigation')

function pendingEvent() {
  console.log('event')
  emit(true)
}

function resolveEvent() {
  emit(false)
}
</script>
