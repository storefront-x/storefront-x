<template>
  <div :style="styles" v-html="pbHtml.innerHtml" />
</template>

<script setup lang="ts">
import usePbBlock from '#ioc/composables/cms/usePbBlock'
import usePbHtml from '#ioc/composables/cms/usePbHtml'
import { computed, PropType } from 'vue'

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbBlock = usePbBlock(props.el)
const pbHtml = usePbHtml(props.el)

const styles = computed(() => {
  return pbBlock.advanced
})
</script>
