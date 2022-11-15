<template>
  <div :class="shopwareCmsBlock.classes" class="relative bg-center">
    <ProductCarousel v-if="products.length" :products="products" />
  </div>
</template>

<script setup lang="ts">
import useGetProductsByIds from '#ioc/services/useGetProductsByIds'
import useAsyncData from '#ioc/composables/useAsyncData'
import ProductCarousel from '#ioc/organisms/ProductCarousel'
import useShopwareCmsBlock from '#ioc/composables/useShopwareCmsBlock'
import useShopwareCmsProductSliderBlock from '#ioc/composables/useShopwareCmsProductSliderBlock'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  section: {
    type: Object,
    default: () => ({}),
  },
})

const getProductsByIds = useGetProductsByIds()
const shopwareCmsProductSliderBlock = useShopwareCmsProductSliderBlock(props)
const shopwareCmsBlock = useShopwareCmsBlock(props)

const {
  data: {
    value: { products },
  },
} = await useAsyncData('carouselProduct', () => getProductsByIds(shopwareCmsProductSliderBlock.ids))
</script>
