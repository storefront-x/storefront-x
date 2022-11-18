<template>
  <div :class="{ hidden: !cartStore.miniCartVisible }">
    <div aria-live="assertive" class="fixed max-w-2xl px-4 z-50 inset-y-28 right-0">
      <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <ul :class="bottom ? 'hidden lg:block' : ''" role="list" class="divide-y divide-gray-200">
          <MiniCartItem v-for="cartItem in cart.items" :key="cartItem.id" :cart-item="cartItem" />
        </ul>
        <dl :class="bottom ? 'lg:border-t' : 'border-t'" class="border-gray-200 py-6 px-4 space-y-6 sm:px-6">
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
import Link from '#ioc/atoms/Link'
import useLocalePath from '#ioc/composables/useLocalePath'
import useCartStore from '#ioc/stores/useCartStore'

defineProps({
  bottom: {
    type: Boolean,
    default: false,
  },
})

const { t } = useI18n()
const cartStore = useCartStore()
const cart = useCart()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
en-US:
  cartDetails: Checkout details
cs-CZ:
  cartDetails: Detail košíku
</i18n>
