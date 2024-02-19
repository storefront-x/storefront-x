<template>
  <div class="relative group">
    <Button
      ref="orderButton"
      large
      color="primary"
      class="w-full order-1 md:order-2 text-xl !px-4"
      :class="{ 'md:w-full': fullWidth, ' md:w-auto': !fullWidth, [additionalStyles]: true }"
      :loading="isPlacingOrder"
      :disabled="!checkoutIsDisabled || isPlacingOrder"
      @click="onPlaceOrder"
    >
      {{ t('Complete order for') }}
    </Button>

    <div class="absolute bottom-full flex-col items-center mb-2 w-full hidden" :class="checkoutIsVisible">
      <span
        class="relative z-10 p-2 text-condensed text-white whitespace-no-wrap bg-primary-500 rounded-lg text-center"
        >{{ checkoutMessage }}</span
      >
      <div class="w-3 h-3 -mt-2 rotate-45 bg-primary-450"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCart from '#ioc/composables/useCart'
import useI18n from '#ioc/composables/useI18n'
import usePlaceOrder from '#ioc/services/usePlaceOrder'
import useLocalePath from '#ioc/composables/useLocalePath'
import { ref, inject } from 'vue'
import Button from '#ioc/atoms/Button'
import useRouter from '#ioc/composables/useRouter'
import useCheckout from '#ioc/composables/useCheckout'

const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const cart = useCart()
const placeOrder = usePlaceOrder()
const checkout = useCheckout()

const isPlacingOrder = ref(false)

const checkoutMessage = inject('Checkout.message', '')
const checkoutIsDisabled = inject('Checkout.isDisabled', false)
const checkoutIsVisible = inject('Checkout.isVisible', false)

defineProps({
  fullWidth: {
    type: Boolean,
    default: false,
  },
  additionalStyles: {
    type: String,
    default: '',
  },
})

const onPlaceOrder = async () => {
  try {
    isPlacingOrder.value = true

    const { order } = await placeOrder()
  } catch (e) {
    isPlacingOrder.value = false

    throw e
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Complete order for: Odeslat objednávku ke zpracování
sl-SI:
  Complete order for: Zaključi naročilo
hr-HR:
  Complete order for: Završite narudžbo
sk-SK:
  Complete order for: Odoslať objednávku na spracovanie
</i18n>
