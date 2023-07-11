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
import { onMounted } from 'vue'
import useEmitPageViewCategory from '#ioc/bus/emitters/useEmitPageViewCategory'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))

const props = defineProps({
  entityUid: {
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
const emitPageViewCategory = useEmitPageViewCategory()

const [data] = await useResource(
  () => ({
    id: props.entityUid,
    page: Number(route.query.page ?? 1),
    pages: Number(route.query.pages ?? 1),
    sort: route.query.sort as string,
    filter: ensureArray(route.query.filter),
    pageSize: Number(route.query.pageSize),
  }),
  (params) =>
    getCategoryById(params.id, {
      page: params.page,
      pages: params.pages,
      sort: params.sort,
      filter: params.filter,
      pageSize: params.pageSize,
    }),
)

onMounted(() => {
  emitPageViewCategory()
})
</script>
