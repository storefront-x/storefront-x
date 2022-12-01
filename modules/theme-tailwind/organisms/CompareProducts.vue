<template>
  <Container class="my-8 md:my-10 overflow-x-auto">
    <Heading class="mb-12" :level="1">{{ t('Compare products') }}</Heading>
    <div class="max-w-full">
      <div class="flex">
        <ProductProvider v-for="(item, index) in comparedProducts" :key="item.id" :product="item">
          <ComparedProductsTile :index="index" />
        </ProductProvider>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import useCompareProducts from '#ioc/services/useCompareProducts'
import ProductProvider from '#ioc/providers/ProductProvider'
import Container from '#ioc/atoms/Container'
import Heading from '#ioc/atoms/Heading'
import ComparedProductsTile from '#ioc/molecules/ComparedProductTile'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()
const comparedProducts = useCompareProducts()

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
