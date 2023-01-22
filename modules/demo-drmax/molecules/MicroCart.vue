<template>
  <Link
    :to="localePath('checkout')"
    class="relative pl-2 text-gray-400 hover:text-gray-500 hover:cursor-pointer lg:hidden"
  >
    <div
      class="flex items-center justify-center h-[50px] w-[50px] bg-green-555 border-green-560 text-white relative rounded-[0_5px_5px_0]"
    >
      <OutlineShoppingBag class="text-primary-500" />
    </div>
    <span class="cart-label" data-cy="microcart-quantity"> 0 {{ cart.itemsTotalQuantity }} </span>
  </Link>
  <div
    role="button"
    class="flex"
    data-cy="minicart-button"
    @click.stop="cartStore.isMiniCartVisible = !cartStore.isMiniCartVisible"
  >
    <span
      class="flex items-center font-bold px-[12px] bg-white border-r-0 rounded-[5px_0_0_5px] border-grey-565 border"
      data-cy="microcart-quantity"
    >
      {{ cart.itemsTotalQuantity }}

      <span v-if="cart.itemsTotalQuantity === 0" class="pl-1">Kč</span>
    </span>
    <div
      class="flex items-center justify-center h-[50px] w-[50px] bg-green-555 border-green-560 text-white relative rounded-[0_5px_5px_0]"
    >
      <OutlineShoppingBag class="text-white" />
    </div>
  </div>
  <MiniCart v-if="cartStore.isMiniCartVisible" />
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import useCart from '#ioc/composables/useCart'
import useLocalePath from '#ioc/composables/useLocalePath'
import OutlineShoppingBag from '#ioc/icons/OutlineShoppingBag'
import useCartStore from '#ioc/stores/useCartStore'
import { defineAsyncComponent } from 'vue'

const MiniCart = defineAsyncComponent(() => import('#ioc/organisms/MiniCart'))
const cart = useCart()
const cartStore = useCartStore()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
cs-CZ:
  Cart: Košík
</i18n>
