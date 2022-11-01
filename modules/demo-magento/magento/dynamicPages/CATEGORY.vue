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
import { defineAsyncComponent } from 'vue'
import useResource from '#ioc/composables/useResource'

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
    sort: route.query.sort as string,
    filter: ensureArray(route.query.filter),
  }),
  (opts) =>
    getCategoryById(opts.id, {
      page: opts.page,
      sort: opts.sort,
      filter: opts.filter,
    }),
)
</script>
