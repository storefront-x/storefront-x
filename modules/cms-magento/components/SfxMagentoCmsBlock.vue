<template>
  <SfxMagentoCmsPage :cms-page="data.cmsBlock" />
  <span></span>
</template>

<script setup lang="ts">
import useGetCmsBlock from '#ioc/services/useGetCmsBlock'
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'
import useAsyncData from '#ioc/composables/useAsyncData'
import { defineProps } from 'vue'

const getCmsBlock = useGetCmsBlock()

const { data } = await useAsyncData('getCMSBlock', () => getCmsBlock(props.identifier))

console.log('sfxblock', data.value.cmsBlock)

const props = defineProps({
  identifier: {
    type: String,
    default: '',
  },
})

// export default {
//   name: 'SfxCmsBlock',

//   components: {
//     SfxPageBuilder,
//   },

//   props: {
//     identifier: {
//       type: String,
//       default: '',
//     },
//   },

//   data() {
//     return {
//       content: '',
//     }
//   },

//   async fetch() {
//     const { cmsBlock } = await GetCmsBlockByIdentifier(toCtx(this))(this.identifier)

//     this.content = cmsBlock.content
//   },
// }
</script>
