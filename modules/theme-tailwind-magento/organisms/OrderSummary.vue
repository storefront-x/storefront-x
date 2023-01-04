<template>
  <div>
    <div class="sticky top-0">
      <Heading :level="2" :class="bottom ? 'hidden lg:block' : ''">
        {{ t('orderSummary') }}
      </Heading>

      <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 :class="bottom ? 'hidden lg:block' : ''" class="sr-only">Items in your cart</h3>
        <ul :class="bottom ? 'hidden lg:block' : ''" role="list" class="divide-y divide-gray-200">
          <OrderSummaryItem
            v-for="(cartItem, index) in cart.items"
            :key="cartItem.id"
            :cart-item="cartItem"
            :data-cy="`cart-summary-list-item-${index}`"
          />
        </ul>
        <dl :class="bottom ? 'lg:border-t' : 'border-t'" class="border-gray-200 py-6 px-4 space-y-6 sm:px-6">
          <div class="flex items-center justify-between">
            <dt>{{ t('subTotal') }}</dt>
            <SfxMoney :money="cart.subtotalIncludingTax" el="dd" class="text-gray-900" />
          </div>
          <div class="flex items-center justify-between">
            <dt>{{ t('shipping') }}</dt>
            <p v-if="isFree" class="text-green-600">{{ t('free') }}</p>
            <SfxMoney v-else :money="checkout.shippingMethod?.priceInclTax" el="dd" class="text-gray-900" />
          </div>
          <div v-for="discount in cart.discounts" :key="discount.label" class="flex items-center justify-between">
            <dt>{{ `${t('discount', [discount.label ? `(${discount.label})` : ''])}` }}</dt>
            <SfxMoney :money="discount.amount" el="dd" class="text-red-600" negate />
          </div>
          <div
            v-for="tax in cart.taxes"
            :key="tax.label"
            class="flex items-center justify-between border-t border-gray-200 pt-6"
          >
            <dt class="text-sm">{{ tax.label }}</dt>
            <SfxMoney :money="tax.amount" el="dd" class="text-sm text-gray-900" />
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt class="text-lg font-bold">{{ t('total') }}</dt>
            <SfxMoney :money="checkout.grandTotal" el="dd" class="text-lg font-bold text-gray-900" />
          </div>
        </dl>
      </div>
      <Coupons />
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import Heading from '#ioc/atoms/Heading'
import useCart from '#ioc/composables/useCart'
import useI18n from '#ioc/composables/useI18n'
import OrderSummaryItem from '#ioc/molecules/OrderSummaryItem'
import Coupons from '#ioc/molecules/Coupons'
import { computed } from 'vue'
import useCheckout from '#ioc/composables/useCheckout'

defineProps({
  bottom: {
    type: Boolean,
    default: false,
  },
})

const { t } = useI18n()
const cart = useCart()
const checkout = useCheckout()

const isFree = computed(
  () =>
    checkout.shippingMethod?.priceInclTax.value === 0 && checkout.shippingMethod?.priceInclTax.currency !== undefined,
)
</script>

<i18n lang="yaml">
en-US:
  orderSummary: Order summary
  subTotal: Subtotal
  shipping: Shipping
  total: Total
  free: FREE
  discount: Discount {0}
cs-CZ:
  orderSummary: Přehled objednávky
  subTotal: Zboží
  shipping: Doprava
  total: Celkem
  free: ZDARMA
  discount: Sleva {0}
</i18n>
