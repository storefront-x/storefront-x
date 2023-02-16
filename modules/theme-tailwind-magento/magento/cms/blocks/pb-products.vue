<template>
  <ProductCarousel v-if="products.length" :products="products" />

  <div v-if="pbProducts.type === 'carousel'">
    <ProductCarousel v-if="products.length" :products="products" />
  </div>

  <div v-if="pbProducts.type === 'grid'">
    <ProductGrid :products="products" />
  </div>
</template>
<script setup lang="ts">
import useGetProductsByIds from '#ioc/services/useGetProductsByIds'
import ProductGrid from '#ioc/molecules/ProductGrid'
import usePbProducts from '#ioc/composables/usePbProducts'
import useResource from '#ioc/composables/useResource'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import { computed } from 'vue'

const ProductCarousel = hydrateWhenVisible(() => import('#ioc/organisms/ProductCarousel'))

const props = defineProps({ el: { type: Object, default: null } })

const pbProducts = usePbProducts(props.el)
const getProductsByIds = useGetProductsByIds()

const [data] = await useResource(
  () => pbProducts.skus,
  (skus) => getProductsByIds(skus),
)
const products = computed(() => data.value.products)
</script>
<script lang="ts">
import { defineComponent } from 'vue'

import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbProducts from '#ioc/mixins/IsPbProducts'

export default defineComponent({
  mixins: [IsPbBlock, IsPbProducts],
})
</script>
