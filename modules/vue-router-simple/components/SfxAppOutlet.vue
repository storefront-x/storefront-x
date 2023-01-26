<template>
  <Suspense @pending="pendingEvent(true)" @resolve="resolveEvent(false)">
    <InnerSfxLayout
      :key="router.$pathMatch"
      :layout="router.$view.layout.component"
      :page="router.$view.page.component"
    />
  </Suspense>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'
import useEmitNavigation from '#ioc/bus/emitters/useEmitNavigation'
import InnerSfxLayout from '#ioc/components/InnerSfxLayout'

const router = useRouter()
const emitNavigation = useEmitNavigation()

function pendingEvent(isLoading: boolean) {
  emitNavigation({ isLoading })
}

function resolveEvent(isLoading: boolean) {
  emitNavigation({ isLoading })
}
</script>
