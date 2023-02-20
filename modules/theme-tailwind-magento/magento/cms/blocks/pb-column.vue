<template>
  <div class="flex" :class="classes">
    <div class="flex flex-col flex-grow" :style="styles">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import usePbBlock from '#ioc/composables/cms/usePbBlock'
import usePbColumn from '#ioc/composables/cms/usePbColumn'
import { computed, PropType } from 'vue'

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbBlock = usePbBlock(props.el)
const pbColumn = usePbColumn(props.el)

// TODO: These classes are removed by CSS purge. This should be improved.
const cols: any = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
}

const classes = computed(() => {
  return ['col-span-12', pbColumn.width ? cols[(12 * pbColumn.width).toFixed()] : `col-md`]
})

const styles = computed(() => {
  return {
    ...pbBlock.background,
    ...pbBlock.advanced,
    alignSelf: pbColumn.alignSelf,
    minHeight: pbColumn.minHeight,
    justifyContent: pbColumn.justifyContent,
  }
})
</script>
