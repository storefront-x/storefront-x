<template>
  <Heading :level="2">{{ t('Select payment method') }}</Heading>
  <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
    <PaymentMethod
      v-for="paymentMethod in payment.paymentMethods"
      :key="paymentMethod.id"
      :payment-method="paymentMethod"
      :is-selected="payment.currentPaymentMethod?.id === paymentMethod.id"
      @select="selectPaymentMethod"
    />
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import PaymentMethod from '#ioc/molecules/PaymentMethod'
import usePayment from '#ioc/composables/usePayment'
import useI18n from '#ioc/composables/useI18n'
import useSelectPaymentMethod from '#ioc/services/useSelectPaymentMethod'

const { t } = useI18n()
const payment = usePayment()
const selectPaymentMethod = useSelectPaymentMethod()
</script>

<i18n lang="yaml">
cs-CZ:
  Select payment method: Vyberte platební metodu
</i18n>
