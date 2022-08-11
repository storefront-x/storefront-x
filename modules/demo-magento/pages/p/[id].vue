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
import useRoute from '#ioc/composables/useRoute'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))

const route = useRoute()

const getProductById = useGetProductById()

const { data } = await useAsyncData('GetProductById', () => getProductById(route.params.id as string))
</script>
