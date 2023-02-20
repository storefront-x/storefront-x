<template>
  <component :is="component" :style="styles">
    <slot />
  </component>
</template>

<script setup lang="ts">
import usePbRow from '#ioc/composables/cms/usePbRow'
import Container from '#ioc/atoms/Container'
import { computed, PropType } from 'vue'

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbRow = usePbRow(props.el)

const component = computed(() => (pbRow.appearance === 'contained' ? Container : 'div'))

const styles = computed(() => {
  return {
    ...pbRow.background,
    ...pbRow.advanced,
    minHeight: pbRow.minHeight,
    justifyContent: pbRow.justifyContent,
  }
})
</script>
