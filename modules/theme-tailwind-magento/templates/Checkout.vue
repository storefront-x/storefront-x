<template>
  <div class="bg-gray-50">
    <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">{{ t('Checkout') }}</h2>

      <div v-if="cart.items.length" class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <OrderSummary class="lg:hidden mb-10" />

        <div>
          <ShippingMethodSelection />

          <PaymentMethodSelection />

          <CheckoutAgreements @place-order="onPlaceOrder" />
        </div>

        <OrderSummary bottom class="mt-10 lg:mt-0" />
      </div>

      <Heading v-else :level="3" class="text-center">
        {{ t('Your cart is empty') }}
      </Heading>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Heading from '#ioc/atoms/Heading'
import useCart from '#ioc/composables/useCart'
import useI18n from '#ioc/composables/useI18n'
import OrderSummary from '#ioc/organisms/OrderSummary'
import ShippingMethodSelection from '#ioc/organisms/ShippingMethodSelection'
import PaymentMethodSelection from '#ioc/organisms/PaymentMethodSelection'
import useSetPaymentAddress from '#ioc/services/useSetPaymentAddress'
import usePayment from '#ioc/composables/usePayment'
import CheckoutAgreements from '#ioc/organisms/CheckoutAgreements'
import usePlaceOrder from '#ioc/services/usePlaceOrder'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'

const { t } = useI18n()
const cart = useCart()
const payment = usePayment()
const setPaymentAddress = useSetPaymentAddress()
const placeOrder = usePlaceOrder()
const showErrorNotification = useShowErrorNotification()

onMounted(async () => {
  if (payment.currentPaymentMethod) return

  await setPaymentAddress({
    city: 'DUMMYDATA',
    country_code: 'CZ',
    postcode: 'DUMMYDATA',
    firstname: 'DUMMYDATA',
    lastname: 'DUMMYDATA',
    street: 'DUMMYDATA',
    telephone: 'DUMMYDATA',
  })
})

const onPlaceOrder = async ({ resolve }: any) => {
  try {
    await placeOrder()
  } catch (e) {
    resolve()

    showErrorNotification(e)
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Checkout: Košík
  Your cart is empty: Váš košík je prázdný
  Please select a shipping method: Vyberte doručovací metodu
  Please select a payment method: Vyberte platební metodu
</i18n>
