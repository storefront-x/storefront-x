<template>
  <CmsPage :cms-page="data.cmsPage" />
</template>

<script setup lang="ts">
import useGetCmsPageById from '#ioc/services/useGetCmsPageById'
import useResource from '#ioc/composables/useResource'
import CmsPage from '#ioc/templates/CmsPage'
import { onMounted } from 'vue'
import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const props = defineProps({
  entityUid: {
    type: String,
    required: true,
  },
})

const getCmsPageById = useGetCmsPageById()
const emitPageViewLabel = useEmitPageViewLabel()

const [data] = await useResource(
  () => props.entityUid,
  (id) => getCmsPageById(id),
)

onMounted(() => {
  emitPageViewLabel(PAGE_LABELS.CMS_PAGE)
})
</script>
