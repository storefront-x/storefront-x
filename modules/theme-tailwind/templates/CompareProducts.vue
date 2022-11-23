<template>
  <CompareProducts />
</template>

<script setup lang="ts">
import CompareProducts from '#ioc/organisms/CompareProducts'
import useWishlist from '#ioc/composables/useWishlist'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()

const wishlist = useWishlist()
</script>

<i18n lang="yaml">
cs-CZ:
  Wishlist: Seznam přání
</i18n>
