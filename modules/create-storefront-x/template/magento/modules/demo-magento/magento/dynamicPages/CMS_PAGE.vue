<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10 links">
    <div v-html="data.cmsPage.content" />
  </Container>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import useGetCmsPageById from '#ioc/services/useGetCmsPageById'
import useResource from '#ioc/composables/useResource'
import Container from '#ioc/atoms/Container'

interface ProductResolverResponse {
  identifier: string
}
const props = defineProps({
  resolverData: {
    type: Object as PropType<ProductResolverResponse>,
    required: true,
  },
})

const getCmsPageById = useGetCmsPageById()

const [data] = await useResource(
  () => props.resolverData.identifier,
  (id) => getCmsPageById(id),
)
</script>
<style scoped>
.links :deep(a) {
  @apply text-primary-500 underline;
}
</style>
