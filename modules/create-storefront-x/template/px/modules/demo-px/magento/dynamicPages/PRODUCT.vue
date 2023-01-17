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

const [data] = await useResource(
  () => props.relativeUrl.replace(/\.html$/, ''),
  (id) => getProductById(id),
)
</script>
