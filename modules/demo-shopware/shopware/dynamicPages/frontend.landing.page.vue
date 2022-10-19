<template>
  <div class="mx-auto mb-8">
    <SfxShopwareCmsPage :data="data" />
  </div>
</template>

<script setup lang="ts">
import useGetCmsPageById from '#ioc/services/useGetCmsPageById'
import SfxShopwareCmsPage from '#ioc/components/SfxShopwareCmsPage'
import useAsyncData from '#ioc/composables/useAsyncData'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const getCmsPageById = useGetCmsPageById()

const { data } = await useAsyncData('cmsPage', () => getCmsPageById(props.id))
</script>
