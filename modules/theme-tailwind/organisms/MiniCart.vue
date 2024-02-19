<template>
  <div
    v-click-outside="close"
    class="absolute max-w-lg px-4 z-50 inset-y-28 right-0"
    :class="{ hidden: !cartStore.isMiniCartVisible }"
  >
    <div id="minicart-wrapper" aria-live="assertive" :class="{ 'min-w-[20em]': cart.items.length === 0 }">
      <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div class="flex h-full flex-col overflow-y-hidden shadow-xl">
          <div class="flex-1 overflow-y-hidden py-6 px-4 sm:px-6">
            <div class="mt-0 bg-white">
              <div class="flow-root">
                <ul role="list" class="-my-6 divide-y divide-gray-200 p-0">
                  <CartItemProvider v-for="cartItem in cart.items.slice(0, 4)" :key="cartItem.id" :cart-item="cartItem">
                    <MiniCartItem />
                  </CartItemProvider>
                  <li v-if="cart.items.length > 4" class="flex flex-col">
                    <Heading :level="3" class="text-center my-4 p-0">{{
                      t('moreItemsInMiniCart', [cart.items.length])
                    }}</Heading>
                  </li>
                  <li v-if="cart.items.length === 0" class="flex flex-col py-6">
                    <Heading :level="3" class="text-center">{{ t('emptyCart') }}</Heading>
                    <div class="flex justify-center my-4">
                      <img class="h-24 w-auto opacity-70" :src="noItemsIcon" :alt="t('No cart items icon')" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="cart.items.length > 0" class="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div class="flex justify-between text-base font-medium text-gray-900 items-center">
              <p>{{ t('subtotal') }}</p>
              <SfxMoney :money="cart.subtotalIncludingTax" el="dd" class="text-lg font-bold text-gray-900" />
            </div>
            <div class="mt-3">
              <Link :to="localePath('checkout')">
                <Button color="primary" class="w-full">
                  <span>{{ t('cartDetails') }}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import Heading from '#ioc/atoms/Heading'
import useCart from '#ioc/composables/useCart'
import CartItemProvider from '#ioc/providers/CartItemProvider'
import useI18n from '#ioc/composables/useI18n'
import MiniCartItem from '#ioc/molecules/MiniCartItem'
import Button from '#ioc/atoms/Button'
import Link from '#ioc/atoms/Link'
import useLocalePath from '#ioc/composables/useLocalePath'
import useCartStore from '#ioc/stores/useCartStore'
import { watchEffect } from 'vue'
import useRoute from '#ioc/composables/useRoute'
import vClickOutside from '#ioc/directives/vClickOutside'
import noItemsIcon from '#ioc/assets/images/cart/no-items-icon'

const { t } = useI18n()
const cartStore = useCartStore()
const cart = useCart()
const localePath = useLocalePath()
const route = useRoute()

const close = () => {
  if (cartStore.isMiniCartVisible) {
    cartStore.isMiniCartVisible = false
  }
}

let currentPath = route.path
watchEffect(() => {
  if (currentPath !== route.path) {
    close()
    currentPath = route.path
  }
})
</script>

<i18n lang="yaml">
en-US:
  subtotal: Subtotal
  cartDetails: Checkout
  moreItemsInMiniCart: To see all ({0}) your items go to Checkout
  emptyCart: Your cart is empty
cs-CZ:
  subtotal: Mezisoučet
  cartDetails: Detaily kosiku
  moreItemsInMiniCart: Všechny ({0}) produkty uvidíte v detailu košíku
  emptyCart: Váš košík je prázdný
  No cart items icon: Prázdný košík ikona
</i18n>
