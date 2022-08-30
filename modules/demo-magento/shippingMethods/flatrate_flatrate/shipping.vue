<template>
  <div />
</template>

<script setup lang="ts">
import useCheckout from '#ioc/composables/useCheckout'
import useShipping from '#ioc/composables/useShipping'
import useSelectShippingMethod from '#ioc/services/useSelectShippingMethod'
import useSetShippingAddress from '#ioc/services/useSetShippingAddress'
import { onMounted } from 'vue'

const emit = defineEmits(['confirm'])

const checkout = useCheckout()
const shipping = useShipping()
const setShippingAddress = useSetShippingAddress()
const selectShippingMethod = useSelectShippingMethod()

onMounted(async () => {
  shipping.setShippingHandler(async () => {
    await setShippingAddress({
      ...checkout.contactInformation!,
      pickupLocationCode: null,
      customerNotes: null,
    })

    await selectShippingMethod(shipping.shippingMethod!)
  })

  emit('confirm')
})
</script>
