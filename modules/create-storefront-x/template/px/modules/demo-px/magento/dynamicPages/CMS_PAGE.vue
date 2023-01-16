<template>
  <CmsPage :cms-page="data.cmsPage" />
</template>

<script setup lang="ts">
import useGetCmsPageById from '#ioc/services/useGetCmsPageById'
import useResource from '#ioc/composables/useResource'
import CmsPage from '#ioc/templates/CmsPage'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const getCmsPageById = useGetCmsPageById()

const [data] = await useResource(
  () => props.id,
  (id) => getCmsPageById(id),
)
</script>
