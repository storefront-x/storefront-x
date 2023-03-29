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
import useCategorySchema from '#ioc/composables/schemaOrg/useCategorySchema'
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

const category = useCategory(computed(() => props.category))

useCategorySchema(category)

let metaData = []
if (props.category.meta.description) {
  metaData.push({
    name: 'description',
    content: props.category.meta.description,
  })
}
if (props.category.meta.keywords) {
  metaData.push({
    name: 'keywords',
    content: props.category.meta.keywords,
  })
}
useHead({
  title: props.category.meta.title,
  meta: metaData,
})
</script>
