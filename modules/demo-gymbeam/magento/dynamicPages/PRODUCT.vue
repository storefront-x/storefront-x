<template>
  <ProductProvider v-if="data" :product="data.product">
    <ProductDetail />
  </ProductProvider>
  <NotFound v-else />
</template>

<script setup lang="ts">
import { defineAsyncComponent, watchEffect } from 'vue'
import useGetProductById from '#ioc/services/useGetProductById'
import ProductProvider from '#ioc/providers/ProductProvider'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import useResource from '#ioc/composables/useResource'
import useRoute from '#ioc/composables/useRoute'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))
const ProductDetail = hydrateWhenVisible(() => import('#ioc/templates/ProductDetail'))

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  relativeUrl: {
    type: String,
    required: true,
  },
})

const getProductById = useGetProductById()
const route = useRoute()
watchEffect(() => console.log(route.query.sku))
const [data] = await useResource(
  () => route.query.sku,
  (id) => getProductById(id),
)
</script>
