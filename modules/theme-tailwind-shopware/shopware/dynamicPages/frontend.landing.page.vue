<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <SfxShopwareCmsPage :data="data" />
  </Container>
</template>

<script setup lang="ts">
import useGetLandingPage from '#ioc/services/useGetLandingPage'
import SfxShopwareCmsPage from '#ioc/components/SfxShopwareCmsPage'
import useAsyncData from '#ioc/composables/useAsyncData'
import Container from '#ioc/atoms/Container'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const getLandingPage = useGetLandingPage()

const { data } = await useAsyncData('GetLandingPage', () => getLandingPage(props.id))
</script>
