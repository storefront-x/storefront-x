<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <Breadcrumbs :breadcrumbs="product.breadcrumbs" />
    <ProductOverview />
    <ProductDetailTabs />

    <section v-if="product?.crossSelling?.length" class="pt-8 sm:px-0">
      <Heading :level="2">{{ t('Related products') }}</Heading>

      <ProductCarousel class="mt-8" :products="product?.crossSelling" />
    </section>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Breadcrumbs from '#ioc/molecules/Breadcrumbs'
import ProductOverview from '#ioc/organisms/ProductOverview'
import ProductDetailTabs from '#ioc/organisms/ProductDetailTabs'
import injectProduct from '#ioc/composables/injectProduct'
import useHead from '#ioc/composables/useHead'
import ProductCarousel from '#ioc/organisms/ProductCarousel'
import Heading from '#ioc/atoms/Heading'
import useI18n from '#ioc/composables/useI18n'
import { computed } from 'vue'

const { t } = useI18n()
const product = injectProduct()

useHead({
  title: computed(() => product.name),
  meta: [
    {
      name: 'description',
      content: computed(() => product.meta.description),
    },
  ],
})
</script>

<i18n lang="yaml">
cs-CZ:
  Related products: Příbuzné produkty
</i18n>
