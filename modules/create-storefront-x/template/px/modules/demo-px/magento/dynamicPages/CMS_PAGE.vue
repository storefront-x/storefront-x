<template>
  <CmsPage :cms-page="data.cmsPage" />
</template>

<script setup lang="ts">
import useGetCmsPageById from '#ioc/services/useGetCmsPageById'
import useResource from '#ioc/composables/useResource'
import CmsPage from '#ioc/templates/CmsPage'
import { onMounted } from 'vue'
import useEmitPageViewCmsPage from '#ioc/bus/emitters/useEmitPageViewCmsPage'

const props = defineProps({
  entityUid: {
    type: String,
    required: true,
  },
})

const getCmsPageById = useGetCmsPageById()
const emitPageViewCmsPage = useEmitPageViewCmsPage()

const [data] = await useResource(
  () => props.entityUid,
  (id) => getCmsPageById(id),
)

onMounted(() => {
  emitPageViewCmsPage()
})
</script>
