<template>
  <div class="relative lg:static" :style="shopwareCmsBlock.styles">
    <h2 id="product-heading" class="sr-only">Products</h2>

    <div class="grid grid-cols-1 gap-2 sm:gap-0 sm:grid-cols-2 xl:grid-cols-3">
      <ProductProvider v-for="(product, i) in shopwareProductThreeColumn.products" :key="product.id" :product="product">
        <ProductTile :preload-image="i === 0" :index="i" />
      </ProductProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductProvider from '#ioc/providers/ProductProvider'
import ProductTile from '#ioc/molecules/ProductTile'
import useShopwareCmsBlock from '#ioc/composables/useShopwareCmsBlock'
import useShopwareCmsProductThreeColumnBlock from '#ioc/composables/useShopwareCmsProductThreeColumnBlock'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const shopwareCmsBlock = useShopwareCmsBlock(props)
const shopwareProductThreeColumn = useShopwareCmsProductThreeColumnBlock(props.data)
</script>
