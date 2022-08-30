<template>
  <div />
</template>

<script setup lang="ts">
import useCheckout from '#ioc/composables/useCheckout'
import usePayment from '#ioc/composables/usePayment'
import useSelectPaymentMethod from '#ioc/services/useSelectPaymentMethod'
import useSetPaymentAddress from '#ioc/services/useSetPaymentAddress'
import { onMounted } from 'vue'

const emit = defineEmits(['confirm'])

const checkout = useCheckout()
const payment = usePayment()
const setPaymentAddress = useSetPaymentAddress()
const selectPaymetMethod = useSelectPaymentMethod()

onMounted(() => {
  payment.setPaymentHandler(async () => {
    await setPaymentAddress({
      ...checkout.contactInformation!,
    })

    await selectPaymetMethod(payment.paymentMethod!)
  })

  emit('confirm')
})
</script>
