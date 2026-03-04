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
import { onMounted } from 'vue'
import useEmitPageViewProduct from '#ioc/bus/emitters/useEmitPageViewProduct'

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
const emitPageViewProduct = useEmitPageViewProduct()

const [data] = await useResource(
  () => props.id,
  (id) => getProductById(id),
)

onMounted(() => {
  emitPageViewProduct()
})
</script>
