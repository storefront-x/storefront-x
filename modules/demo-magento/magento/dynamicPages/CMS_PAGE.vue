<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10 links">
    <SfxMagentoCmsPage :cms-page="data.cmsPage" />
  </Container>
</template>

<script setup lang="ts">
import useGetCmsPageById from '#ioc/services/useGetCmsPageById'
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'
import useAsyncData from '#ioc/composables/useAsyncData'
import Container from '#ioc/atoms/Container'
import useHead from '#ioc/composables/useHead'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const getCmsPageById = useGetCmsPageById()

const { data } = await useAsyncData('cmsPage', () => getCmsPageById(props.id))

useHead({
  title: data.value.cmsPage.metaTitle,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: data.value.cmsPage.metaDescription,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: data.value.cmsPage.metaKeywords,
    },
  ],
})
</script>
<style scoped>
.links :deep(a) {
  @apply text-primary-500 underline;
}
</style>
