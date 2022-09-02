<template>
  <Component :is="component" :class="classes">
    <slot />
  </Component>
</template>

<script setup lang="ts">
import RouterLink from '#ioc/components/RouterLink'
import { computed, PropType, useAttrs } from 'vue'

const props = defineProps({
  color: {
    type: String as PropType<'primary' | 'gray' | 'black'>,
    default: 'primary',
  },
})

const attrs = useAttrs()

const component = computed(() => (attrs.to ? RouterLink : 'a'))

const classes = computed(() => ({
  'text-primary-500 hover:text-primary-500': props.color === 'primary',
  'text-gray-600 hover:text-gray-800': props.color === 'gray',
  'text-gray-900': props.color === 'black',
}))
</script>
