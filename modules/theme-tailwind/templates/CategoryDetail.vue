<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <Breadcrumbs :breadcrumbs="category.breadcrumbs" />

    <CategoryInfo :category="category" />

    <ProductListing :products="products" :aggregations="aggregations" :total-count="totalCount">
      <template #bellow-products>
        <Description v-if="category.description" :description="category.description" />
      </template>
    </ProductListing>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Breadcrumbs from '#ioc/molecules/Breadcrumbs'
import CategoryInfo from '#ioc/molecules/CategoryInfo'
import ToCategory from '#ioc/mappers/ToCategory'
import ToProduct from '#ioc/mappers/ToProduct'
import useHead from '#ioc/composables/useHead'
import { computed, PropType } from 'vue'
import useCategory from '#ioc/composables/useCategory'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'

import hydrateWhenIdle from '#ioc/utils/hydration/hydrateWhenIdle'

const ProductListing = hydrateWhenIdle(() => import('#ioc/organisms/ProductListing'))
const Description = hydrateWhenVisible(() => import('#ioc/atoms/Description'))

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof ToCategory>>,
    required: true,
  },
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

useHead({
  title: props.category.name,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: props.category.meta.description,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: props.category.meta.keywords,
    },
  ],
})

const category = useCategory(computed(() => props.category))
</script>
