<template>
  <Container class="my-8 md:my-10 overflow-x-auto">
    <Heading class="mb-12" :level="1">{{ t('Compare products') }}</Heading>
    <div class="max-w-full">
      <table v-if="compareProducts.items.length">
        <tr>
          <td></td>
          <td v-for="(item, index) in compareProducts.items" :key="item.product.id" class="border-r border-b">
            <ProductProvider :product="item.product">
              <ProductTile class="border-none w-96" :preload-image="index === 0" :index="index" />
            </ProductProvider>
          </td>
        </tr>
        <tr v-for="(attribute, index) in compareProducts.attributes" :key="index">
          <td
            class="border-r align-top p-4 font-medium"
            :class="index === compareProducts.attributes.length - 1 || 'border-b'"
          >
            {{ attribute.label }}
          </td>
          <td
            v-for="(item, indexAttr) in compareProducts.items"
            :key="indexAttr"
            class="align-top p-4"
            :class="[
              indexAttr === compareProducts.items.length - 1 || 'border-r',
              index === compareProducts.attributes.length - 1 || 'border-b',
            ]"
          >
            <span v-html="item.attributes[index].value"></span>
          </td>
        </tr>
      </table>
    </div>
  </Container>
</template>

<script setup lang="ts">
import ProductProvider from '#ioc/providers/ProductProvider'
import Container from '#ioc/atoms/Container'
import Heading from '#ioc/atoms/Heading'
import ProductTile from '#ioc/molecules/ProductTile'
import useI18n from '#ioc/composables/useI18n'
import useProductComparison from '#ioc/composables/useProductComparison'

const { t } = useI18n()
const compareProducts = useProductComparison()

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
