<template>
  <Modal v-if="isShown" @close="onClose">
    <Heading :level="3">{{ t('Credit card payment') }}</Heading>

    <div id="dropin-container" />

    <div v-if="isLoading">
      {{ t('Payment gateway is loading...') }}
    </div>

    <Button v-if="showPayButton" color="primary" class="w-full mt-2" data-cy="braintree-confirm" @click="onPay">
      {{ t('Pay') }}
    </Button>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '#ioc/atoms/Modal'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'
import useBraintreeDropin from '#ioc/composables/useBraintreeDropin'
import { nextTick, onMounted, ref } from 'vue'
import usePayment from '#ioc/composables/usePayment'
import makeAwaiter from '#ioc/utils/makeAwaiter'
import useCheckout from '#ioc/composables/useCheckout'
import useConfirmPaymentAddress from '#ioc/services/useConfirmPaymentAddress'
import useConfirmBraintreePaymentMethod from '#ioc/services/useConfirmBraintreePaymentMethod'

const emit = defineEmits(['select', 'confirm'])

const { t } = useI18n()
const checkout = useCheckout()
const payment = usePayment()
const confirmPaymentAddress = useConfirmPaymentAddress()
const confirmBraintreePaymetMethod = useConfirmBraintreePaymentMethod()
const braintreeDropin = useBraintreeDropin()

const isShown = ref(false)
const isLoading = ref(false)
const showPayButton = ref(true)
const awaiter = makeAwaiter()

onMounted(() => {
  emit('select')

  payment.setPaymentHandler(async () => {
    isShown.value = true
    showPayButton.value = true

    await nextTick()

    await braintreeDropin.initialize('#dropin-container')

    isLoading.value = false

    await awaiter.wait()
  })

  emit('confirm')
})

const onPay = async () => {
  showPayButton.value = false

  const { nonce } = await braintreeDropin.requestPayment()

  isShown.value = false

  await confirmPaymentAddress({
    ...checkout.contactInformation!,
  })

  await confirmBraintreePaymetMethod(payment.paymentMethod!, { nonce })

  awaiter.resolve()
}

const onClose = () => {
  isShown.value = false

  awaiter.reject(new Error('Closed'))
}
</script>
