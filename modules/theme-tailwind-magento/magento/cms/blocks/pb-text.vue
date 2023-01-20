<template>
  <div :style="styles" v-html="pbText.innerHtml" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import usePbText from '#ioc/composables/cms/usePbText'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

const props = defineProps({ el: { type: Object, default: null } })

const pbText = usePbText(props.el)
const pbBlock = usePbBlock(props.el)

const styles = computed(() => {
  return { ...pbBlock.advanced }
})
</script>
