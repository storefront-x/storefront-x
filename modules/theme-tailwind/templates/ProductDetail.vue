<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <Breadcrumbs :breadcrumbs="product.breadcrumbs" />
    <ProductOverview />
    <ProductDetailTabs />

    <section v-if="product?.upsellProducts?.length" class="mt-8 border-t border-gray-200 pt-8 sm:px-0">
      <Heading :level="2">{{ t('Customers also bought') }}</Heading>

      <ProductCarousel class="mt-8" :products="product?.upsellProducts" />
    </section>

    <section v-if="product?.relatedProducts?.length" class="mt-8 border-t border-gray-200 pt-8 sm:px-0">
      <Heading :level="2">{{ t('Related products') }}</Heading>

      <ProductCarousel class="mt-8" :products="product?.relatedProducts" />
    </section>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Breadcrumbs from '#ioc/molecules/Breadcrumbs'
import ProductOverview from '#ioc/organisms/ProductOverview'
import injectProduct from '#ioc/composables/injectProduct'
import useHead from '#ioc/composables/useHead'
import Heading from '#ioc/atoms/Heading'
import useI18n from '#ioc/composables/useI18n'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import useProductSchema from '#ioc/composables/schemaOrg/useProductSchema'
import useEmitViewProduct from '#ioc/bus/emitters/useEmitViewProduct'
import { onMounted } from 'vue'

const ProductDetailTabs = hydrateWhenVisible(() => import('#ioc/organisms/ProductDetailTabs'))
const ProductCarousel = hydrateWhenVisible(() => import('#ioc/organisms/ProductCarousel'))

const { t } = useI18n()
const product = injectProduct()

const emitViewProduct = useEmitViewProduct()

useProductSchema(product)

onMounted(() => {
  emitViewProduct({ product })
})

let metaData = []
if (product.meta.description) {
  metaData.push({
    name: 'description',
    content: product.meta.description,
  })
}
if (product.meta.keywords) {
  metaData.push({
    name: 'keywords',
    content: product.meta.keywords,
  })
}
useHead({
  title: product.meta.title,
  meta: metaData,
})
</script>

<i18n lang="yaml">
cs-CZ:
  Related products: Příbuzné produkty
</i18n>
