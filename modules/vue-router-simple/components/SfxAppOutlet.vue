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
import useEmitNavigationStart from '#ioc/bus/emitters/useEmitNavigationStart'
import useEmitNavigationEnd from '#ioc/bus/emitters/useEmitNavigationEnd'
import InnerSfxLayout from '#ioc/components/InnerSfxLayout'

const router = useRouter()
const emitNavigationStart = useEmitNavigationStart()
const emitNavigationEnd = useEmitNavigationEnd()

function pendingEvent() {
  emitNavigationStart({})
}

function resolveEvent() {
  emitNavigationEnd({})
}
</script>
