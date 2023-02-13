<template>
  <Container class="my-8 md:my-10 sm:mx-2 xl:mx-auto">
    <Heading :level="1">{{ t('compareProducts') }}</Heading>
    <div class="mt-12 md:overflow-x-auto overflow-x-scroll">
      <template v-if="comparison.isLoaded">
        <table v-if="comparison.items.length">
          <tr class="border-b">
            <td></td>
            <td v-for="(item, index) in comparison.items" :key="item.product.id" class="border-l">
              <ProductProvider :product="item.product">
                <ProductTile class="border-none w-80" :preload-image="index === 0" :index="index" />
              </ProductProvider>
            </td>
          </tr>
          <tr
            v-for="(attribute, index) in comparison.attributes"
            :key="index"
            :class="index === comparison.attributes.length - 1 || 'border-b'"
          >
            <td class="align-top p-4 font-medium sticky left-0 bg-gray-100">
              {{ attribute.label }}
            </td>
            <td v-for="(item, indexAttr) in comparison.items" :key="indexAttr" class="align-top p-4 border-l w-80">
              <span v-html="item.attributes[index].value"></span>
            </td>
          </tr>
        </table>
        <Heading v-else :level="3" class="text-center">
          {{ t('noCompareProducts') }}
        </Heading>
      </template>
      <Heading v-else :level="3" class="text-center">
        {{ t('comparisonLoading') }}
      </Heading>
    </div>
  </Container>
</template>

<script setup lang="ts">
import ProductProvider from '#ioc/providers/ProductProvider'
import Container from '#ioc/atoms/Container'
import Heading from '#ioc/atoms/Heading'
import ProductTile from '#ioc/molecules/ProductTile'
import useI18n from '#ioc/composables/useI18n'
import useComparison from '#ioc/composables/useComparison'

const { t } = useI18n()
const comparison = useComparison()
</script>

<i18n lang="yaml">
en-US:
  compareProducts: Compare Products
  comparisonLoading: Your comparison list is loading.
  noCompareProducts: You have no products to compare.
cs-CZ:
  compareProducts: Srovnání produktů
  comparisonLoading: Vaše srovnání se načítá.
  noCompareProducts: Nemáte žádné produkty k srovnání.
</i18n>
