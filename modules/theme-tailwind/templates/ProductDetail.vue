<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <Breadcrumbs :breadcrumbs="product.breadcrumbs" />
    <ProductOverview />
    <ProductDetailTabs />
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Breadcrumbs from '#ioc/molecules/Breadcrumbs'
import ProductOverview from '#ioc/organisms/ProductOverview'
import ProductDetailTabs from '#ioc/organisms/ProductDetailTabs'
import injectProduct from '#ioc/composables/injectProduct'
import useHead from '#ioc/composables/useHead'

const product = injectProduct()

useHead({
  title: product.name,
  meta: Object.entries(product.metaData).map(([name, description]) => ({ name, description })),
})
</script>
