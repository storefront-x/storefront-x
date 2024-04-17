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
import useResource from '#ioc/composables/useResource'
import ensureArray from '#ioc/utils/array/ensureArray'
import { defineAsyncComponent, PropType } from 'vue'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))

interface ProductResolverResponse {
  uid: string
}
const props = defineProps({
  resolverData: {
    type: Object as PropType<ProductResolverResponse>,
    required: true,
  },
})

const route = useRoute()

const getCategoryById = useGetCategoryById()

const [data] = await useResource(
  () => ({
    id: props.resolverData.uid,
    page: Number(route.query.page ?? 1),
    sort: route.query.sort as string,
    filter: ensureArray(route.query.filter),
  }),
  (params) =>
    getCategoryById(params.id, {
      page: params.page,
      sort: params.sort,
      filter: params.filter,
    }),
)
</script>
