<template>
  <a :href="to || '/'" @click.prevent.stop="onClick">
    <slot />
  </a>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const onClick = () => {
  router.push(props.to)
}
</script>
