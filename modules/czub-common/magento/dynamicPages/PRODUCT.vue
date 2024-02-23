<template>
  <ProductProvider v-if="data" :product="data.product">
    <ProductDetail />
  </ProductProvider>
  <NotFound v-else />
</template>

<script setup lang="ts">
import { defineAsyncComponent, PropType } from 'vue'
import useGetProductById from '#ioc/services/useGetProductById'
import ProductProvider from '#ioc/providers/ProductProvider'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import useResource from '#ioc/composables/useResource'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))
const ProductDetail = hydrateWhenVisible(() => import('#ioc/templates/ProductDetail'))
interface ProductResolverResponse {
  sku: string
  url_key: string
  uid: string
}
const props = defineProps({
  resolverData: {
    type: Object as PropType<ProductResolverResponse>,
    required: true,
  },
})

const getProductById = useGetProductById()

const [data] = await useResource(
  () => props.resolverData.sku,
  (id) => getProductById(id),
)
</script>
