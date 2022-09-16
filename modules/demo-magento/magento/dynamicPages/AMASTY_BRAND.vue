<template>
  <BrandDetail
    :brand="brand"
    :products="data.products"
    :aggregations="data.aggregations"
    :total-count="data.totalCount"
  />
</template>

<script setup lang="ts">
import BrandDetail from '#ioc/templates/BrandDetail'
import useGetBrandDetailById from '#ioc/services/useGetBrandDetailById'
import useRoute from '#ioc/composables/useRoute'
import useAsyncData from '#ioc/composables/useAsyncData'
import ensureArray from '#ioc/utils/array/ensureArray'
import useBrand from '#ioc/composables/useBrand'
import { computed } from 'vue'
import useHead from '#ioc/composables/useHead'

const route = useRoute()
const getBrandDetailById = useGetBrandDetailById()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const { data } = await useAsyncData('brandDetail', () =>
  getBrandDetailById(props.id, {
    page: Number(route.query.page ?? 1),
    sort: route.query.sort as string,
    filter: ensureArray(route.query.filter),
  }),
)

const brand = useBrand(computed(() => data.value.brand))

useHead({
  title: data.value.brand.name,
})
</script>
