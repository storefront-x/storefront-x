<template>
  <div />
</template>

<script setup lang="ts">
import useBraintreeGooglepay from '#ioc/composables/useBraintreeGooglepay'
import { onMounted } from 'vue'
import usePayment from '#ioc/composables/usePayment'
import useCheckout from '#ioc/composables/useCheckout'
import useConfirmPaymentAddress from '#ioc/services/useConfirmPaymentAddress'
import useConfirmBraintreePaymentMethod from '#ioc/services/useConfirmBraintreePaymentMethod'

const emit = defineEmits(['select', 'confirm'])

const checkout = useCheckout()
const payment = usePayment()
const confirmPaymentAddress = useConfirmPaymentAddress()
const confirmBraintreePaymetMethod = useConfirmBraintreePaymentMethod()
const braintreeGooglePay = useBraintreeGooglepay()

onMounted(async () => {
  emit('select')

  await braintreeGooglePay.initialize()

  payment.setPaymentHandler(async () => {
    const { nonce } = await braintreeGooglePay.requestPayment()

    await confirmPaymentAddress({
      ...checkout.contactInformation!,
    })

    await confirmBraintreePaymetMethod(payment.paymentMethod!, { nonce })
  })

  emit('confirm')
})
</script>
