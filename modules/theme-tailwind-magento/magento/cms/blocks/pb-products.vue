<template>
  <ProductCarousel v-if="products.length" :products="products" />
</template>

<script setup lang="ts">
import useGetProductsByIds from '#ioc/services/useGetProductsByIds'
import usePbProducts from '#ioc/composables/cms/usePbProducts'
import useResource from '#ioc/composables/useResource'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import { computed, PropType } from 'vue'

const ProductCarousel = hydrateWhenVisible(() => import('#ioc/organisms/ProductCarousel'))

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbProducts = usePbProducts(props.el)
const getProductsByIds = useGetProductsByIds()

const [data] = await useResource(
  () => pbProducts.skus,
  (skus) => getProductsByIds(skus),
)
const products = computed(() => data.value.products)
</script>
