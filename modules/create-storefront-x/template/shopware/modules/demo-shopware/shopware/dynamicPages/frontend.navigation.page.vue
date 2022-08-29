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
import useAsyncData from '#ioc/composables/useAsyncData'
import ensureArray from '#ioc/utils/array/ensureArray'
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))

const route = useRoute()

const getCategoryBdId = useGetCategoryById()

const { data } = await useAsyncData('category', () =>
  getCategoryBdId(props.id as string, {
    page: Number(route.query.page ?? 1),
    sort: route.query.sort as string,
    filter: ensureArray(route.query.filter),
  }),
)
</script>
