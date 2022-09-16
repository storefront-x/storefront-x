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
import useHead from '#ioc/composables/useHead'

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

const { data } = await useAsyncData('product', () => getProductById(props.relativeUrl.replace(/\.html$/, '')))

useHead({
  title: data.value.product.meta.metaTitle,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: data.value.product.meta.metaDescription,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: data.value.product.meta.metaKeywords,
    },
  ],
})
</script>
