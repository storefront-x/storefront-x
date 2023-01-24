<template>
  <component :is="pbHeading.headingType" :style="styles">
    {{ pbHeading.headingText }}
  </component>
</template>

<script setup lang="ts">
import usePbBlock from '#ioc/composables/cms/usePbBlock'
import usePbHeading from '#ioc/composables/cms/usePbHeading'
import { computed, PropType } from 'vue'

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbBlock = usePbBlock(props.el)
const pbHeading = usePbHeading(props.el)

const styles = computed(() => {
  return { ...pbBlock.advanced }
})
</script>
