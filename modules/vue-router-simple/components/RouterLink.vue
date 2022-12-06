<template>
  <a :href="resolvedHref" @click.prevent.stop="onClick">
    <slot v-bind="{ isExactActive }" />
  </a>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'
import useRoute from '#ioc/composables/useRoute'
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
})

const router = useRouter()
const route = useRoute()

const resolvedHref = computed(() => {
  if (typeof props.to === 'string') {
    return props.to || '/'
  }
  return router.resolve(props.to).fullPath
})

const isExactActive = computed(() => {
  if (typeof props.to === 'string') {
    return props.to === route.fullPath
  }

  return router.resolve(props.to).fullPath === route.fullPath
})
const onClick = () => {
  router.push(props.to)
}
</script>
