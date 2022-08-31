<template>
  <Component :is="selectedPaymentMethod" />
</template>

<script setup lang="ts">
import usePayment from '#ioc/composables/usePayment'
import { shallowRef, watch } from 'vue'
import paymentMethods from '~/.sfx/paymentMethods'

const props = defineProps({
  export: {
    type: String,
    default: 'default',
  },
})

const payment = usePayment()

const selectedPaymentMethod = shallowRef<any>(null)

watch(
  () => payment.paymentMethod,
  (value) => {
    if (!value) return

    const component = paymentMethods[value.code as keyof typeof paymentMethods]

    selectedPaymentMethod.value = component[props.export as keyof typeof component]
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>
