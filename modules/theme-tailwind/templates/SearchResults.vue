<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <Breadcrumbs :breadcrumbs="[]" />

    <Heading :level="1" data-cy="title">{{ t('title', [route.query.query]) }}</Heading>

    <ProductListing :products="products" :aggregations="aggregations" :total-count="totalCount" />
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Breadcrumbs from '#ioc/molecules/Breadcrumbs'
import Heading from '#ioc/atoms/Heading'
import ToProduct from '#ioc/mappers/ToProduct'
import ProductListing from '#ioc/organisms/ProductListing'
import useI18n from '#ioc/composables/useI18n'
import useRoute from '#ioc/composables/useRoute'
import { PropType } from 'vue'

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

const { t } = useI18n()
const route = useRoute()
</script>

<i18n lang="yaml">
cs-CZ:
  'title': 'Hledaný výraz: {0}'
en-US:
  'title': 'Search query: {0}'
</i18n>
