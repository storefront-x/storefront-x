<template>
  <div v-click-outside="close" :class="{ hidden: !cartStore.miniCartVisible }">
    <div aria-live="assertive" class="absolute max-w-2xl px-4 z-40 inset-y-28 right-0">
      <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <ul role="list" class="divide-y divide-gray-200">
          <MiniCartItem v-for="cartItem in cart.items.slice(0, 4)" :key="cartItem.id" :cart-item="cartItem" />
          <li v-if="cart.items.length > 4" class="flex flex-col">
            <Heading :level="3" class="text-center">{{ t('moreItemsInMiniCart') }}</Heading>
          </li>
          <li v-if="cart.items.length === 0" class="flex flex-col px-6">
            <Heading :level="3" class="text-center">{{ t('emptyCart') }}</Heading>
          </li>
        </ul>
        <dl v-if="cart.items.length" class="py-6 px-4 space-y-6 sm:px-6">
          <div class="flex items-center justify-between border-gray-200 pt-6">
            <Link :to="localePath('checkout')" class="relative pl-2 text-gray-400 hover:text-gray-500">
              <Button color="primary">
                <span>{{ t('cartDetails') }}</span>
              </Button>
            </Link>
            <SfxMoney :money="cart.subtotalIncludingTax" el="dd" class="text-lg font-bold text-gray-900" />
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import useCart from '#ioc/composables/useCart'
import useI18n from '#ioc/composables/useI18n'
import MiniCartItem from '#ioc/molecules/MiniCartItem'
import Button from '#ioc/atoms/Button'
import Heading from '#ioc/atoms/Heading'
import Link from '#ioc/atoms/Link'
import useLocalePath from '#ioc/composables/useLocalePath'
import useCartStore from '#ioc/stores/useCartStore'
import { watchEffect } from 'vue'
import useRoute from '#ioc/composables/useRoute'
import vClickOutside from '#ioc/directives/vClickOutside'

const { t } = useI18n()
const cartStore = useCartStore()
const cart = useCart()
const localePath = useLocalePath()
const route = useRoute()

const close = () => {
  if (cartStore.miniCartVisible) {
    cartStore.miniCartVisible = false
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
  cartDetails: Checkout
  moreItemsInMiniCart: To see all your items go to Checkout
  emptyCart: Your cart is empty
cs-CZ:
  cartDetails: Detaily kosiku
  moreItemsInMiniCart: Všechny produkty uvidíte v detailu košíku
  emptyCart: Váš košík je prázdný
</i18n>
