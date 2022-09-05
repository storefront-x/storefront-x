<template>
  <div class="relative bg-center">
    <ProductCarousel v-if="products.length" :products="products" />
  </div>
</template>

<script setup lang="ts">
import useGetProductsByIds from '#ioc/services/useGetProductsByIds'
import useAsyncData from '#ioc/composables/useAsyncData'
import ProductCarousel from '#ioc/organisms/ProductCarousel'
import useShopwareCmsBlockProductSlider from '#ioc/composables/useShopwareCmsBlockProductSlider'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const getProductsByIds = useGetProductsByIds()
const shopwareCmsBlockProductSlider = useShopwareCmsBlockProductSlider(props)

const {
  data: {
    value: { products },
  },
} = await useAsyncData('carouselProduct', () => getProductsByIds(shopwareCmsBlockProductSlider.ids))
</script>
