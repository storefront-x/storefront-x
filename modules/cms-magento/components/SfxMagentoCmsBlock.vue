<template>
  <SfxMagentoCmsPage :cms-page="data.cmsBlock" />
</template>

<script setup lang="ts">
import useGetCmsBlock from '#ioc/services/useGetCmsBlock'
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'
import useAsyncData from '#ioc/composables/useAsyncData'

const getCmsBlock = useGetCmsBlock()

const props = defineProps({
  identifier: {
    type: String,
    default: '',
  },
})

const { data } = await useAsyncData(`getCMSBlock_${props?.identifier}`, () => getCmsBlock(props.identifier))
</script>
