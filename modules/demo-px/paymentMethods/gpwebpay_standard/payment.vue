<template>
  <div />
</template>

<script setup lang="ts">
import useCheckout from '#ioc/composables/useCheckout'
import usePayment from '#ioc/composables/usePayment'
import useConfirmPaymentMethod from '#ioc/services/useConfirmPaymentMethod'
import useConfirmPaymentAddress from '#ioc/services/useConfirmPaymentAddress'
import { onMounted } from 'vue'

const emit = defineEmits(['select', 'confirm'])

const checkout = useCheckout()
const payment = usePayment()
const confirmPaymentAddress = useConfirmPaymentAddress()
const confirmPaymetMethod = useConfirmPaymentMethod()

onMounted(async () => {
  emit('select')

  payment.setPaymentHandler(async () => {
    await confirmPaymentAddress({
      ...checkout.contactInformation!,
    })

    await confirmPaymetMethod(payment.paymentMethod!)
  })

  emit('confirm')
})
</script>
