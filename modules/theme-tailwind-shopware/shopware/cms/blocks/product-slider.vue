<template>
  <div class="relative bg-center">
    <ProductCarousel v-if="products.length" :products="products" />
  </div>
</template>

<script setup lang="ts">
import useGetProductsByIds from '#ioc/services/useGetProductsByIds'
import useAsyncData from '#ioc/composables/useAsyncData'
import ProductCarousel from '#ioc/organisms/ProductCarousel'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const getProductsByIds = useGetProductsByIds()
const ids = props.data.slots[0].data.products.map((item: any) => item.id)
const {
  data: {
    value: { products },
  },
} = await useAsyncData('carouselProduct', () => getProductsByIds(ids))
</script>
