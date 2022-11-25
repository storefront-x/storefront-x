<template>
  <CategoryDetail
    v-if="data"
    :category="data.category"
    :products="data.products"
    :total-count="data.totalCount"
    :aggregations="data.aggregations"
  />
  <NotFound v-else />
</template>

<script setup lang="ts">
import CategoryDetail from '#ioc/templates/CategoryDetail'
import useGetCategoryById from '#ioc/services/useGetCategoryById'
import useRoute from '#ioc/composables/useRoute'
import ensureArray from '#ioc/utils/array/ensureArray'
import useResource from '#ioc/composables/useResource'
import { defineAsyncComponent } from 'vue'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  relativeUrl: {
    type: String,
    required: true,
  },
})

const route = useRoute()
const getCategoryById = useGetCategoryById()

const [data] = await useResource(
  () => ({
    id: props.id,
    page: Number(route.query.page ?? 1),
    pageSize: route.query.pages,
    sort: route.query.sort as string,
    filter: ensureArray(route.query.filter),
  }),
  (params) =>
    getCategoryById(params.id, {
      page: params.page,
      pageSize: params.pageSize,
      sort: params.sort,
      filter: params.filter,
    }),
)
</script>
