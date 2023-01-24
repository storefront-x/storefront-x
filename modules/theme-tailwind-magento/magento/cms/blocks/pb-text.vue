<template>
  <div :style="styles" v-html="pbText.innerHtml" />
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import usePbText from '#ioc/composables/cms/usePbText'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbText = usePbText(props.el)
const pbBlock = usePbBlock(props.el)

const styles = computed(() => {
  return { ...pbBlock.advanced }
})
</script>
