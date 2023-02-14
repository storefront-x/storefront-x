<template>
  <div :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import usePbBlock from '#ioc/composables/cms/usePbBlock'
import usePbButtons from '#ioc/composables/cms/usePbButtons'
import { computed, PropType } from 'vue'

const props = defineProps({ el: { type: Object as PropType<HTMLElement> as PropType<HTMLElement>, default: null } })

const pbBlock = usePbBlock(props.el)
const pbButtons = usePbButtons(props.el)

const classes = computed(() => {
  return {
    'flex gap-2': true,
    'flex-row': pbButtons.appearance === 'inline',
    'flex-col': pbButtons.appearance === 'stacked',
    'justify-start': pbBlock.advanced.textAlign === 'left',
    'justify-center': pbBlock.advanced.textAlign === 'center',
    'justify-end': pbBlock.advanced.textAlign === 'right',
  }
})

const styles = computed(() => {
  return {
    ...pbBlock.advanced,
    textAlign: undefined,
  }
})
</script>
