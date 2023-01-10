<template>
  <div v-click-outside="close" :class="{ hidden: !cartStore.isMiniCartVisible }">
    <div
      id="minicart-wrapper"
      aria-live="assertive"
      class="absolute max-w-lg px-4 z-50 inset-y-14 -right-5"
      :class="{ 'min-w-[15em]': cart.items.length === 0 }"
    >
      <div class="bg-white border-2 border-primary-500">
        <div class="flex h-full flex-col overflow-y-hidden shadow-xl">
          <div class="flex-1 overflow-y-hidden py-6 px-4 sm:px-6">
            <div class="mt-0 bg-white">
              <div class="flow-root">
                <ul role="list" class="-my-6 p-0">
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

          <div v-if="cart.items.length > 0" class="py-6 px-4 sm:px-6">
            <div>
              <Link :to="localePath('checkout')">
                <Button color="primary" class="w-full bg-green-855 rounded-none uppercase">
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
sk-SK:
  subtotal: Medzisúčet
  cartDetails: Detaily kosiku
  moreItemsInMiniCart: Všetky ({0}) produkty uvidíte v detaile košíka
  emptyCart: Váš košík je prázdny
  No cart items icon: Prázdny košík ikona
</i18n>

<style scoped>
#minicart-wrapper:before {
  @apply right-[10%] -top-[12px];
}
#minicart-wrapper:after {
  @apply right-[10%] -top-[14px];
}
#minicart-wrapper:before,
#minicart-wrapper:after {
  @apply absolute h-0 w-0 content-[''] block;
}

#minicart-wrapper:after {
  border: 7px solid;
  border-color: transparent transparent #000;
  z-index: 98;
}

#minicart-wrapper:before {
  border: 7px solid;
  border-color: transparent transparent #fff;
  z-index: 99;
}
</style>
