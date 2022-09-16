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
import useHead from '#ioc/composables/useHead'

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

const { data } = await useAsyncData('category', () =>
  getCategoryById(props.id, {
    page: Number(route.query.page ?? 1),
    sort: route.query.sort as string,
    filter: ensureArray(route.query.filter),
  }),
)

useHead({
  title: data.value.category.metaTitle,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: data.value.category.metaDescription,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: data.value.category.metaKeywords,
    },
  ],
})
</script>
