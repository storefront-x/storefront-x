<template>
  <Link
    :to="localePath('wishlist')"
    class="relative mr-0 p-2 text-gray-400 hover:text-gray-500"
    data-cy="micro-wishlist"
  >
    <span class="sr-only">{{ t('Wishlist') }}</span>
    <div class="rounded-lg border-2 p-2 border-none border-gray-100 lg:border-solid hover:bg-gray-100">
      <OutlineHeart class="text-primary-500" />
    </div>
    <span
      v-if="wishlistStore.items.length"
      class="absolute top-0 right-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
      data-cy="micro-wishlist-quantity"
    >
      {{ wishlistStore.items.length }}
    </span>
  </Link>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import OutlineHeart from '#ioc/icons/OutlineHeart'
import useI18n from '#ioc/composables/useI18n'
import useLocalePath from '#ioc/composables/useLocalePath'
import useWishlistStore from '#ioc/stores/useWishlistStore'

const { t } = useI18n()

const localePath = useLocalePath()
const wishlistStore = useWishlistStore()
</script>

<i18n lang="yaml">
cs-CZ:
  Wishlist: Seznam přání
</i18n>
