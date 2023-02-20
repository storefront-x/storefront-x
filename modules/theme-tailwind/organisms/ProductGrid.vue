<template>
  <div class="grid grid-cols-1 gap-2 sm:gap-0 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <ProductProvider v-for="(product, i) in products" :key="product.id" :product="product">
      <ProductTile :preload-image="i === 0" :index="i" grid-borders />
    </ProductProvider>
  </div>
</template>
<script setup lang="ts">
import ProductProvider from '#ioc/providers/ProductProvider'
import ProductTile from '#ioc/molecules/ProductTile'
import ToProduct from '#ioc/mappers/ToProduct'
import { PropType } from 'vue'

defineProps({
  products: {
    type: Array as PropType<ReturnType<typeof ToProduct>[]>,
    required: true,
  },
})
</script>
