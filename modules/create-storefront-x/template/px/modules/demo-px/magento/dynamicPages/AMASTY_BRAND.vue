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
import { onMounted } from 'vue'
import useEmitPageViewAmastyBrand from '#ioc/bus/emitters/useEmitPageViewAmastyBrand'

const route = useRoute()
const getBrandDetailById = useGetBrandDetailById()
const emitPageViewAmastyBrand = useEmitPageViewAmastyBrand()

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

onMounted(() => {
  emitPageViewAmastyBrand()
})
</script>
