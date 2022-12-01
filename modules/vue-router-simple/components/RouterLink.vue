<template>
  <a :href="resolvedHref" @click.prevent.stop="onClick">
    <slot />
  </a>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
})

const router = useRouter()

const resolvedHref = computed(() => {
  if (typeof props.to === 'string') {
    return props.to || '/'
  }
  return router.resolve(props.to).fullPath
})
const onClick = () => {
  router.push(props.to)
}
</script>
