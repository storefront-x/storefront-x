<template>
  <slot v-if="cmsData" name="above" />
  <SfxMagentoCmsPage v-if="cmsData" :cms-page="data.cmsBlock" />
  <slot v-if="cmsData" name="bellow" />
</template>

<script setup lang="ts">
import useGetCmsBlock from '#ioc/services/useGetCmsBlock'
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'
import useAsyncData from '#ioc/composables/useAsyncData'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'

const getCmsBlock = useGetCmsBlock()
const showErrorNotification = useShowErrorNotification()

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
    showErrorNotification(error.value)
  }
  cmsData = data.value
} catch (e) {
  console.warn(e)
}
</script>
