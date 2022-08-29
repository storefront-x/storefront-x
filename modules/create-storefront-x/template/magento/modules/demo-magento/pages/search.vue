<template>
  <SearchResults :products="data.products" :aggregations="data.aggregations" :total-count="data.totalCount" />
</template>

<script setup lang="ts">
import SearchResults from '#ioc/templates/SearchResults'
import useRoute from '#ioc/composables/useRoute'
import useAsyncData from '#ioc/composables/useAsyncData'
import useGetSearchSuggestions from '#ioc/services/useGetSearchSuggestions'
import ensureArray from '#ioc/utils/array/ensureArray'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'

const route = useRoute()
const getSearchSuggestions = useGetSearchSuggestions()

const { data } = await useAsyncData('searchProducts', () =>
  getSearchSuggestions({
    search: String(route.query.query),
    filter: ensureArray(route.query.filter),
    currentPage: Number(route.query.page ?? 1),
    pageSize: CATALOG_PAGE_SIZE,
    sort: route.query.sort as string,
  }),
)
</script>
