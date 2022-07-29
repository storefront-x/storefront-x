<template>
  <div class="mt-10 lg:mt-0">
    <Heading :level="2">{{ t('Order summary') }}</Heading>

    <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 class="sr-only">{{ t('Items in your cart') }}</h3>
      <ul role="list" class="divide-y divide-gray-200">
        <CartItemProvider v-for="cartItem in cart.items" :key="cartItem.id" :cart-item="cartItem">
          <OrderSummaryItem />
        </CartItemProvider>
      </ul>

      <dl class="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
        <div class="flex items-center justify-between">
          <dt class="text-sm">{{ t('Subtotal') }}</dt>
          <SfxMoney v-slot="{ html }" :money="cart.prices.subtotalIncludingTax">
            <dd class="text-sm font-medium text-gray-900" v-html="html" />
          </SfxMoney>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt class="text-base font-medium">{{ t('Total') }}</dt>
          <SfxMoney v-slot="{ html }" :money="cart.prices.subtotalIncludingTax">
            <dd class="text-base font-medium text-gray-900" v-html="html" />
          </SfxMoney>
        </div>
      </dl>

      <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
        <Button
          color="primary"
          class="w-full"
          :disabled="!checkout.contactInformation"
          :loading="isPlaceOrderLoading"
          @click="onPlaceOrder"
        >
          {{ t('Confirm order') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import OrderSummaryItem from '#ioc/molecules/OrderSummaryItem'
import CartItemProvider from '#ioc/providers/CartItemProvider'
import useI18n from '#ioc/composables/useI18n'
import useCart from '#ioc/composables/useCart'
import usePlaceOrder from '#ioc/services/usePlaceOrder'
import useCheckout from '#ioc/composables/useCheckout'
import { ref } from 'vue'

const { t } = useI18n()
const cart = useCart()
const checkout = useCheckout()
const placeOrder = usePlaceOrder()

const isPlaceOrderLoading = ref(false)

const onPlaceOrder = async () => {
  try {
    isPlaceOrderLoading.value = true

    await placeOrder()
  } catch (e) {
    isPlaceOrderLoading.value = false

    throw e
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Subtotal: Položky
  Total: Celkem
</i18n>
