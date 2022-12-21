<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <Breadcrumbs :breadcrumbs="product.breadcrumbs"/>
    <ProductOverview/>
    <ProductDetailTabs/>

    <section v-if="product?.upsellProducts?.length" class="mt-8 border-t border-gray-200 pt-8 sm:px-0">
      <Heading :level="2">{{ t('Customers also bought') }}</Heading>

      <ProductCarousel class="mt-8" :products="product?.upsellProducts"/>
    </section>

    <section v-if="product?.crossSellProducts?.length" class="mt-8 border-t border-gray-200 pt-8 sm:px-0">
      <Heading :level="2">{{ t('Related products') }}</Heading>

      <ProductCarousel class="mt-8" :products="product?.crossSellProducts"/>
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
import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'

const ProductDetailTabs = hydrateWhenVisible(() => import('#ioc/organisms/ProductDetailTabs'))
const ProductCarousel = hydrateWhenVisible(() => import('#ioc/organisms/ProductCarousel'))

const {t} = useI18n()
const product = injectProduct()

useProductSchema(product)

useHead({
  title: product.meta.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: product.meta.description,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: product.meta.keywords,
    },
  ],
})

const productBrand = product.attributes.find((atr) => atr.code === 'brand')

const emit = {
  currency: product.finalPrice?.currency,
  value: +product.finalPrice?.value / PRICE_OFFSET,
  items: [
    {
      item_id: product.sku,
      item_name: product.name,
      // affiliation: 'Google Merchandise Store',
      discount: product.finalPrice?.value !== product.regularPrice?.value ? (+product.regularPrice.value - +product.finalPrice.value) / PRICE_OFFSET : 0.00,
      item_brand: productBrand?.valueLabel,
      item_category: product.categories?.at(0) && product.categories[0].name,
      item_category2: product.categories?.at(1) && product.categories[1].name,
      item_category3: product.categories?.at(2) && product.categories[2].name,
      item_category4: product.categories?.at(3) && product.categories[3].name,
      item_category5: product.categories?.at(4) && product.categories[4].name,
      price: +product.regularPrice.value / PRICE_OFFSET,
      product_type: product.productType,
    },
  ],
}
</script>

<i18n lang="yaml">
cs-CZ:
  Related products: Příbuzné produkty
</i18n>
