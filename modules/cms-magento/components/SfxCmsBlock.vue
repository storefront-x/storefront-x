<template>
  <SfxMagentoCmsPage :content="content" />
</template>

<script setup lang="ts">
import useGetCmsBlock from '#ioc/services/useGetCmsBlock'
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'

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
