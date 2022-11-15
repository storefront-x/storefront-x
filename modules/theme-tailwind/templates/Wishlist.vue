<template>
  <Container class="my-8 md:my-10">
    <Heading :level="1">{{ t('Wishlist') }}</Heading>

    <div class="pt-4 md:pt-6 md:pb-8 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-0 xl:grid-cols-3 2xl:grid-cols-4">
      <ProductProvider v-for="(item, i) in wishlist.wishlistProducts.value" :key="item.id" :product="item">
        <ProductTile :index="i" />
      </ProductProvider>
    </div>
  </Container>
</template>

<script setup lang="ts">
import ProductProvider from '#ioc/providers/ProductProvider'
import Container from '#ioc/atoms/Container'
import Heading from '#ioc/atoms/Heading'
import ProductTile from '#ioc/molecules/ProductTile'
import useWishlist from '#ioc/composables/useWishlist'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()

const wishlist = useWishlist()
</script>

<i18n lang="yaml">
cs-CZ:
  Wishlist: Seznam přání
</i18n>
