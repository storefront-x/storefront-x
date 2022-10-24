<template>
  <ProductCarousel v-if="products.length" :products="products" />
</template>
<script setup lang="ts">
import useGetProductsByIds from '#ioc/services/useGetProductsByIds'
import usePbProducts from '#ioc/composables/usePbProducts'
import useAsyncData from '#ioc/composables/useAsyncData'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'

const ProductCarousel = hydrateWhenVisible(() => import('#ioc/organisms/ProductCarousel'))

const props = defineProps({ el: { type: Object, default: null } })

const pbProducts = usePbProducts(props.el)
const getProductsByIds = useGetProductsByIds()

const { data } = await useAsyncData('carouselProduct', () => getProductsByIds(pbProducts.skus))
const products = data.value.products
</script>
<script lang="ts">
import { defineComponent } from 'vue'

import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbProducts from '#ioc/mixins/IsPbProducts'

export default defineComponent({
  mixins: [IsPbBlock, IsPbProducts],
})
</script>
