<template>
  <ProductProvider v-if="data" :product="data.product">
    <ProductDetail />
  </ProductProvider>
  <NotFound v-else />
</template>

<script setup lang="ts">
import ProductDetail from '#ioc/templates/ProductDetail'
import useGetProductById from '#ioc/services/useGetProductById'
import useAsyncData from '#ioc/composables/useAsyncData'
import ProductProvider from '#ioc/providers/ProductProvider'
import { defineAsyncComponent } from 'vue'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const getProductById = useGetProductById()

const { data } = await useAsyncData('product', () => getProductById(props.id as string))
</script>
