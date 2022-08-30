<template>
  <div class="bg-gray-50">
    <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">{{ t('Checkout') }}</h2>

      <div v-if="cart.items.length" class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <OrderSummary class="lg:hidden mb-10" />

        <div>
          <ShippingMethodSelection :is-open="isShippingOpen" @select="onSelectShipping" @confirm="onConfirmShipping" />

          <PaymentMethodSelection :is-open="isPaymentOpen" @select="onSelectPayment" @confirm="onConfirmPayment" />

          <ContactInfoSelection />

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
import Heading from '#ioc/atoms/Heading'
import useCart from '#ioc/composables/useCart'
import useI18n from '#ioc/composables/useI18n'
import OrderSummary from '#ioc/organisms/OrderSummary'
import ShippingMethodSelection from '#ioc/organisms/ShippingMethodSelection'
import PaymentMethodSelection from '#ioc/organisms/PaymentMethodSelection'
import CheckoutAgreements from '#ioc/organisms/CheckoutAgreements'
import usePlaceOrder from '#ioc/services/usePlaceOrder'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useSetContactInformation from '#ioc/services/useSetContactInformation'
import useLocalePath from '#ioc/composables/useLocalePath'
import useRouter from '#ioc/composables/useRouter'
import useCheckout from '#ioc/composables/useCheckout'
import useRefreshCheckout from '#ioc/services/useRefreshCheckout'
import IS_SERVER from '#ioc/config/IS_SERVER'
import ContactInfoSelection from '#ioc/organisms/ContactInfoSelection'
import useAsyncData from '#ioc/composables/useAsyncData'
import useRefreshCheckoutAgreements from '#ioc/services/useRefreshCheckoutAgreements'
import { computed, onMounted, ref } from 'vue'

const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const cart = useCart()
const checkout = useCheckout()
const refreshCheckout = useRefreshCheckout()
const setContactInformation = useSetContactInformation()
const placeOrder = usePlaceOrder()
const showErrorNotification = useShowErrorNotification()
const refreshCheckoutAgreements = useRefreshCheckoutAgreements()

const step = ref(0)

const isShippingOpen = computed(() => step.value >= 1)

const isPaymentOpen = computed(() => isShippingOpen.value && step.value >= 2)

const onSelectShipping = () => {
  step.value = 1
}

const onConfirmShipping = () => {
  step.value = 2
}

const onSelectPayment = () => {
  step.value = 2
}

const onConfirmPayment = () => {
  step.value = 3
}

useAsyncData('checkoutAgreements', () => refreshCheckoutAgreements())

if (IS_SERVER) {
  await refreshCheckout()
} else {
  onMounted(async () => {
    if (checkout.contactInformation) {
      await refreshCheckout()
    } else {
      await setContactInformation({
        email: 'DUMMYDATA@DUMMYDATA.DUMMYDATA',
        telephone: 'DUMMYDATA',
        firstName: 'DUMMYDATA',
        lastName: 'DUMMYDATA',
        street: 'DUMMYDATA',
        city: 'DUMMYDATA',
        postcode: 'DUMMYDATA',
        countryCode: 'CZ',
      })
    }

    step.value = 1
  })
}

const onPlaceOrder = async ({ resolve }: any) => {
  try {
    const { order } = await placeOrder()

    router.push(localePath({ name: 'thank-you', query: { orderNumber: order.orderNumber } }))
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
