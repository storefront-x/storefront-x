<template>
  <div class="bg-gray-50">
    <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">{{ t('Checkout') }}</h2>

      <div v-if="cart.items.length" class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <OrderSummary class="lg:hidden mb-10" />

        <div>
          <ShippingMethodSelection
            v-if="shipping.shippingMethods.length > 0"
            :is-open="isShippingOpen"
            @select="onSelectShipping"
            @confirm="onConfirmShipping"
          />

          <PaymentMethodSelection
            :is-open="isPaymentOpen"
            :class="{ '!pt-0 border-none': shipping.shippingMethods.length === 0 }"
            @select="onSelectPayment"
            @confirm="onConfirmPayment"
          />

          <ContactInfoSelection
            :is-open="isContactInfoOpen"
            @select="onSelectContactInfo"
            @confirm="onConfirmContactInfo"
          />

          <CheckoutAgreements :is-open="isAgreementsOpen" @place-order="onPlaceOrder" />
        </div>

        <OrderSummary bottom class="mt-10 lg:mt-0" />
      </div>

      <Heading v-else-if="cart.isLoaded" :level="3" class="text-center">
        {{ t('Your cart is empty') }}
      </Heading>

      <Heading v-else :level="3" class="text-center">
        {{ t('Your cart is loading') }}
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
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useLocalePath from '#ioc/composables/useLocalePath'
import useRouter from '#ioc/composables/useRouter'
import ContactInfoSelection from '#ioc/organisms/ContactInfoSelection'
import useRefreshCheckoutAgreements from '#ioc/services/useRefreshCheckoutAgreements'
import { computed, nextTick, onMounted, ref } from 'vue'
import useShipping from '#ioc/composables/useShipping'
import useEmitBeginCheckout from '#ioc/bus/emitters/useEmitBeginCheckout'
import randomNumber from '#ioc/utils/number/random'

const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const cart = useCart()
const shipping = useShipping()
const showErrorNotification = useShowErrorNotification()
const refreshCheckoutAgreements = useRefreshCheckoutAgreements()
const emitBeginCheckout = useEmitBeginCheckout()

const step = ref(1)

const isShippingOpen = computed(() => step.value >= 1)

const isPaymentOpen = computed(() => isShippingOpen.value && step.value >= 2)

const isContactInfoOpen = computed(() => isPaymentOpen.value && step.value >= 3)

const isAgreementsOpen = computed(() => isContactInfoOpen.value && step.value >= 4)

const onSelectShipping = () => {
  step.value = 1
}

const onConfirmShipping = async () => {
  await nextTick()
  step.value = 2
}

const onSelectPayment = () => {
  step.value = 2
}

const onConfirmPayment = async () => {
  await nextTick()
  step.value = 3
}

const onSelectContactInfo = () => {
  step.value = 3
}

const onConfirmContactInfo = async () => {
  try {
    await nextTick()
    step.value = 4
  } catch (error) {
    console.warn(error)
  }
}

onMounted(async () => {
  await refreshCheckoutAgreements()

  if (cart.items?.length) {
    emitBeginCheckout({ cart })
  }
})

const onPlaceOrder = async ({ resolve }: any) => {
  try {
    if (shipping.shippingMethods.length > 0) {
      await shipping.shippingHandler!()
    }

    const orderNumber = randomNumber(10000, 1000000)
    router.push(localePath({ name: 'thank-you', query: { orderNumber: 'PRG' + orderNumber } }))
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
