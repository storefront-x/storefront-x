<template>
  <div class="py-4" :style="pbBlock.advanced">
    <div class="inline-block" :style="styles" />
  </div>
</template>

<script setup lang="ts">
import usePbBlock from '#ioc/composables/cms/usePbBlock'
import usePbDivider from '#ioc/composables/cms/usePbDivider'
import { computed, PropType } from 'vue'

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbBlock = usePbBlock(props.el)
const pbDivider = usePbDivider(props.el)

const styles = computed(() => {
  return {
    height: pbDivider.thickness,
    backgroundColor: pbDivider.color,
    width: pbDivider.width,
  }
})
</script>
