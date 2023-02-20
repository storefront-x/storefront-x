<template>
  <SfxMagentoCmsPage v-if="data?.cmsDynamicBlock" :cms-page="data.cmsDynamicBlock" />
  <div></div>
</template>

<script setup lang="ts">
import useGetCmsDynamicBlockById from '#ioc/services/useGetCmsDynamicBlockById'
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'
import useAsyncData from '#ioc/composables/useAsyncData'
import usePbDynamicBlock from '#ioc/composables/cms/usePbDynamicBlock'
import { PropType } from 'vue'

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const getCmsDynamicBlockById = useGetCmsDynamicBlockById()
const pbDynamicBlock = usePbDynamicBlock(props.el)

const { data } = await useAsyncData(`getCMSDynamicBlock_${pbDynamicBlock.blockId}`, () =>
  getCmsDynamicBlockById(pbDynamicBlock.blockId ?? ''),
)
</script>
