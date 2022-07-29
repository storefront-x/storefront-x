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
import useToCategory from '#ioc/mappers/useToCategory'
import useToProduct from '#ioc/mappers/useToProduct'
import ProductListing from '#ioc/organisms/ProductListing'
import useHead from '#ioc/composables/useHead'
import { PropType } from 'vue'

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<ReturnType<typeof useToCategory>>>,
    required: true,
  },
  products: {
    type: Array as PropType<ReturnType<ReturnType<typeof useToProduct>>[]>,
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
</script>
