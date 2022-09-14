<template>
  <div class="relative lg:static">
    <div class="pt-8 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-6">
      <div>
        <ProductFilters :aggregations="aggregations" />
      </div>

      <div aria-labelledby="product-heading" class="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-5">
        <h2 id="product-heading" class="sr-only">Products</h2>

        <div
          class="absolute right-0 top-8 lg:top-[unset] lg:right-[unset] lg:static lg:flex lg:justify-between lg:items-end"
        >
          <h3 class="hidden lg:block mb-4 text-neutral-600 text-lg font-medium">
            {{ t('Products found: {0}', [totalCount]) }}
          </h3>

          <ProductSort class="mb-4" :title="t(sortedBy)" />
        </div>

        <div class="grid grid-cols-1 gap-2 sm:gap-0 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <ProductProvider v-for="(product, i) in products" :key="product.id" :product="product">
            <ProductTile :preload-image="i === 0" :index="i" />
          </ProductProvider>
        </div>

        <div class="flex justify-between items-center mt-8">
          <Pagination :total="totalCount" class="my-8" />
        </div>
        <slot name="bellow-products" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import useRoute from '#ioc/composables/useRoute'
import ToProduct from '#ioc/mappers/ToProduct'
import ProductSort from '#ioc/molecules/ProductSort'
import ProductTile from '#ioc/molecules/ProductTile'
import ProductProvider from '#ioc/providers/ProductProvider'
import { computed, PropType } from 'vue'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import hydrateWhenIdle from '#ioc/utils/hydration/hydrateWhenIdle'

const ProductFilters = hydrateWhenIdle(() => import('#ioc/molecules/ProductFilters'))
const Pagination = hydrateWhenVisible(() => import('#ioc/molecules/Pagination'))

const { t } = useI18n()
const route = useRoute()

defineProps({
  products: {
    type: Array as PropType<ReturnType<typeof ToProduct>[]>,
    required: true,
  },
  aggregations: {
    type: Array,
    default: () => [],
  },
  totalCount: {
    type: Number,
    required: true,
  },
})

const sortedBy = computed(() => String(route.query.sort ?? 'Best match'))
</script>

<i18n lang="yaml">
cs-CZ:
  Best match: nejlepší shoda
  'price,ASC': 'nejlevnějších'
  'price,DESC': 'nejdražších'
  'Products found: {0}': 'Nalezeno produktů: {0}'
en-US:
  'price,ASC': 'lowest price'
  'price,DESC': 'highest price'
</i18n>
