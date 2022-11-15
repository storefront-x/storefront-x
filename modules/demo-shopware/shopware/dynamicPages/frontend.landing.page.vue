<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <SfxShopwareCmsPage :data="data" />
  </Container>
</template>

<script setup lang="ts">
import useGetCmsPageById from '#ioc/services/useGetCmsPageById'
import SfxShopwareCmsPage from '#ioc/components/SfxShopwareCmsPage'
import useResource from '#ioc/composables/useResource'
import Container from '#ioc/atoms/Container'

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
