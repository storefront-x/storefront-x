<template>
  <Container class="my-8 md:my-10">
    <Heading class="mb-12" :level="1">{{ t('Compare products') }}</Heading>
    <div class="max-w-full overflow-x-auto">
      <div class="flex">
        <ProductProvider v-for="(item, index) in comparedProducts" :key="item.id" :product="item">
          <div>
            <ComparedProductsTile :index="index" />
          </div>
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
