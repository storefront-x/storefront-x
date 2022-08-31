<template>
  <SearchResults :products="data.products" :aggregations="data.aggregations" :total-count="data.totalCount" />
</template>

<script setup lang="ts">
import SearchResults from '#ioc/templates/SearchResults'
import useRoute from '#ioc/composables/useRoute'
import useAsyncData from '#ioc/composables/useAsyncData'
import useGetProductsBySearch from '#ioc/services/useGetProductsBySearch'
import ensureArray from '#ioc/utils/array/ensureArray'

const route = useRoute()
const searchProducts = useGetProductsBySearch()

const { data } = await useAsyncData('searchProducts', () =>
  searchProducts(route.query.query as string, {
    page: Number(route.query.page ?? 1),
    sort: route.query.sort as string,
    filter: ensureArray(route.query.filter),
  }),
)
</script>
