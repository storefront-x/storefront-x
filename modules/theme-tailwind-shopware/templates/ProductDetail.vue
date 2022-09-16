<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <Breadcrumbs :breadcrumbs="product.breadcrumbs" />
    <ProductOverview />
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Breadcrumbs from '#ioc/molecules/Breadcrumbs'
import ProductOverview from '#ioc/organisms/ProductOverview'
import injectProduct from '#ioc/composables/injectProduct'
import useHead from '#ioc/composables/useHead'
import { computed } from 'vue'

const product = injectProduct()

useHead({
  title: computed(() => product.meta.title),
  meta: [
    {
      name: 'description',
      content: computed(() => product.meta.description),
    },
  ],
})
</script>
