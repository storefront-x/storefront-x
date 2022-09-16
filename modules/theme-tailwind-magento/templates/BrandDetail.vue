<template>
  <Container class="my-8 md:my-10">
    <Breadcrumbs :breadcrumbs="brand.breadcrumbs" />

    <BrandInfo :brand="brand" />

    <Prose v-if="brand.image || brand.description">
      <SfxImage v-if="brand.image" :src-m2="brand.image" class-img="px-32" />
      <div v-html="brand.description" />
    </Prose>

    <ProductListing :title="brand.name" :products="products" :aggregations="aggregations" :total-count="totalCount" />
  </Container>
</template>

<script setup lang="ts">
import BrandInfo from '#ioc/organisms/BrandInfo'
import ProductListing from '#ioc/organisms/ProductListing'
import Container from '#ioc/atoms/Container'
import Breadcrumbs from '#ioc/molecules/Breadcrumbs'
import ToProduct from '#ioc/mappers/ToProduct'
import Prose from '#ioc/atoms/Prose'
import SfxImage from '#ioc/components/SfxImage'
import { PropType } from 'vue'
import useBrand from '#ioc/composables/useBrand'
import useHead from '#ioc/composables/useHead'

const props = defineProps({
  brand: {
    type: Object as PropType<ReturnType<typeof useBrand>>,
    required: true,
  },
  products: {
    type: Array as PropType<ReturnType<typeof ToProduct>[]>,
    default: () => [],
  },
  aggregations: {
    type: Array,
    default: () => [],
  },
  totalCount: {
    type: Number,
    default: 0,
  },
})

useHead({
  title: props.brand.name,
})
</script>
