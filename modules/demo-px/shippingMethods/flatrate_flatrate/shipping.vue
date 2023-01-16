<template>
  <div />
</template>

<script setup lang="ts">
import useCheckout from '#ioc/composables/useCheckout'
import useShipping from '#ioc/composables/useShipping'
import useConfirmShippingMethod from '#ioc/services/useConfirmShippingMethod'
import useConfirmShippingAddress from '#ioc/services/useConfirmShippingAddress'
import { onMounted } from 'vue'

const emit = defineEmits(['select', 'confirm'])

const checkout = useCheckout()
const shipping = useShipping()
const confirmShippingAddress = useConfirmShippingAddress()
const confirmShippingMethod = useConfirmShippingMethod()

onMounted(async () => {
  emit('select')

  shipping.setShippingHandler(async () => {
    await confirmShippingAddress({
      ...checkout.contactInformation!,
      pickupLocationCode: null,
      customerNotes: null,
    })

    await confirmShippingMethod(shipping.shippingMethod!)
  })

  emit('confirm')
})
</script>
