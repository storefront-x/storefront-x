<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10 links">
    <SfxMagentoCmsPage :cms-page="cmsPage" />
  </Container>
</template>

<script setup lang="ts">
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'
import Container from '#ioc/atoms/Container'
import useHead from '#ioc/composables/useHead'

const props = defineProps({
  cmsPage: {
    type: Object,
    default: () => ({}),
  },
})

let metaData = []
if (props.cmsPage.meta.description) {
  metaData.push({
    name: 'description',
    content: props.cmsPage.meta.description,
  })
}
if (props.cmsPage.meta.keywords) {
  metaData.push({
    name: 'keywords',
    content: props.cmsPage.meta.keywords,
  })
}
useHead({
  title: props.cmsPage.meta.title,
  meta: metaData,
})
</script>
<style scoped>
.links :deep(a) {
  @apply text-primary-500 underline;
}
</style>
