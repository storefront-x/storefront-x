<template>
  <ProductProvider v-if="data" :product="data.product">
    <ProductDetail />
  </ProductProvider>
  <NotFound v-else />
</template>

<script setup lang="ts">
import ProductDetail from '#ioc/templates/ProductDetail'
import useGetProductById from '#ioc/services/useGetProductById'
import useResource from '#ioc/composables/useResource'
import ProductProvider from '#ioc/providers/ProductProvider'
import { defineAsyncComponent } from 'vue'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))

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
