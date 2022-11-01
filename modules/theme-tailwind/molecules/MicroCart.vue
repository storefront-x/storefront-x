<template>
  <Link :to="localePath('checkout')" class="relative pl-2 text-gray-400 hover:text-gray-500">
    <span class="sr-only">{{ t('Cart') }}</span>
    <div
      class="rounded-lg border-2 p-2 border-none border-gray-100 lg:border-solid hover:bg-gray-100 rounded-full lg:p-3"
    >
      <OutlineShoppingBag class="text-primary-500" />
    </div>
    <span
      v-if="cart.itemsTotalQuantity > 0"
      class="absolute top-0 right-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
      data-cy="microcart-quantity"
    >
      {{ cart.itemsTotalQuantity }}
    </span>
  </Link>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import useCart from '#ioc/composables/useCart'
import useI18n from '#ioc/composables/useI18n'
import useLocalePath from '#ioc/composables/useLocalePath'
import OutlineShoppingBag from '#ioc/icons/OutlineShoppingBag'

const { t } = useI18n()
const cart = useCart()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
cs-CZ:
  Cart: Košík
</i18n>
