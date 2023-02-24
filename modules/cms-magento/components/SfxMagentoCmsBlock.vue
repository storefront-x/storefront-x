<template>
  <slot v-if="cmsData" name="above" />
  <SfxMagentoCmsPage v-if="cmsData" :cms-page="data.cmsBlock" />
  <slot v-if="cmsData" name="bellow" />
</template>

<script setup lang="ts">
import useGetCmsBlock from '#ioc/services/useGetCmsBlock'
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'
import useAsyncData from '#ioc/composables/useAsyncData'

const getCmsBlock = useGetCmsBlock()

const props = defineProps({
  identifier: {
    type: String,
    default: null,
  },
})

let cmsData: Awaited<ReturnType<typeof getCmsBlock>> | null = null

try {
  const { data, error } = await useAsyncData(`getCMSBlock_${props?.identifier}`, () => getCmsBlock(props.identifier))
  if (error.value) {
    throw error.value
  }
  cmsData = data.value
} catch (e) {
  console.warn(e)
}
</script>
