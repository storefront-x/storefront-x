<template>
  <div>
    <h1>Compare products</h1>
    <Heading :level="1">{{ t('Compare products') }}</Heading>
    <div class="grid grid-flow-col grid-rows-1">
      <ProductProvider v-for="(item, i) in wishlist.wishlistProducts.value" :key="item.id" :product="item">
        <ProductTile :index="i" />
      </ProductProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCompareProducts from '#ioc/services/useCompareProducts'
import ProductProvider from '#ioc/providers/ProductProvider'
import Heading from '#ioc/atoms/Heading'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()

const data = [
  {
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
  },
]

defineProps({
  brand: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Compare products: Srovnání produktů
</i18n>
