<template>
  <a :href="pbButtonItem.link ?? ''" :class="classes">
    <Button :color="color">
      {{ pbButtonItem.content }}
    </Button>
  </a>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import usePbButtonItem from '#ioc/composables/cms/usePbButtonItem'
import usePbButtons from '#ioc/composables/cms/usePbButtons'
import { computed, getCurrentInstance, PropType } from 'vue'

const instance = getCurrentInstance()

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbButtonItem = usePbButtonItem(props.el)
const pbButtons = usePbButtons(instance?.parent?.props.el as HTMLElement)

const classes = computed(() => {
  return {
    'flex-grow-1': pbButtons.sameWidth,
    'flex-grow-0': !pbButtons.sameWidth,
  }
})

const color = computed(() => {
  if (pbButtonItem.type === 'primary') return 'primary'
  return 'light'
})
</script>
