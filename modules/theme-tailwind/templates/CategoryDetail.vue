<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <Breadcrumbs :breadcrumbs="category.breadcrumbs" />

    <CategoryInfo :category="category" />

    <ProductListing :products="products" :aggregations="aggregations" :total-count="totalCount" />
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Breadcrumbs from '#ioc/molecules/Breadcrumbs'
import CategoryInfo from '#ioc/molecules/CategoryInfo'
import ToCategory from '#ioc/mappers/ToCategory'
import ToProduct from '#ioc/mappers/ToProduct'
import ProductListing from '#ioc/organisms/ProductListing'
import useHead from '#ioc/composables/useHead'
import { computed, PropType } from 'vue'
import useCategory from '#ioc/composables/useCategory'

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
})

const category = useCategory(computed(() => props.category))
</script>
