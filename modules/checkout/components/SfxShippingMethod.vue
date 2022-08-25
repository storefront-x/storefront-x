<template>
  <Component :is="selectedShippingMethod" />
</template>

<script setup lang="ts">
import useShipping from '#ioc/composables/useShipping'
import { shallowRef, watch } from 'vue'
import shippingMethods from '~/.sfx/shippingMethods'

const props = defineProps({
  export: {
    type: String,
    default: 'default',
  },
})

const shipping = useShipping()

const selectedShippingMethod = shallowRef<any>(null)

watch(
  () => shipping.currentShippingMethod,
  (currentShippingMethod) => {
    if (!currentShippingMethod) return

    const component = shippingMethods[currentShippingMethod.code as keyof typeof shippingMethods]

    selectedShippingMethod.value = component[props.export as keyof typeof component]
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>
