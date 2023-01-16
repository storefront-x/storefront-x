<template>
  <SearchResults :products="data.products" :aggregations="data.aggregations" :total-count="data.totalCount" />
</template>

<script setup lang="ts">
import SearchResults from '#ioc/templates/SearchResults'
import useRoute from '#ioc/composables/useRoute'
import useGetSearchSuggestions from '#ioc/services/useGetSearchSuggestions'
import ensureArray from '#ioc/utils/array/ensureArray'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'
import useResource from '#ioc/composables/useResource'

const route = useRoute()
const getSearchSuggestions = useGetSearchSuggestions()

const [data] = await useResource(
  () => ({
    search: String(route.query.query),
    filter: ensureArray(route.query.filter),
    currentPage: Number(route.query.page ?? 1),
    pageSize: CATALOG_PAGE_SIZE * (route.query.pages || 1),
    sort: route.query.sort as string,
  }),
  (params) =>
    getSearchSuggestions({
      search: params.search,
      filter: params.filter,
      currentPage: params.currentPage,
      pageSize: params.pageSize,
      sort: params.sort,
    }),
)
</script>
