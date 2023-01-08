<template>
  <ProductProvider v-if="data" :product="data.product">
    <ProductDetail />
  </ProductProvider>
  <NotFound v-else />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import useGetProductById from '#ioc/services/useGetProductById'
import ProductProvider from '#ioc/providers/ProductProvider'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import useResource from '#ioc/composables/useResource'
import useRoute from '#ioc/composables/useRoute'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))
const ProductDetail = hydrateWhenVisible(() => import('#ioc/templates/ProductDetail'))

const getProductById = useGetProductById()
const route = useRoute()

const [data] = await useResource(
  () => route.query.sku,
  (id) => getProductById(id),
)
</script>
