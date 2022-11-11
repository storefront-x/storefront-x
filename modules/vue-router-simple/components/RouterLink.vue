<template>
  <a class="hover:cursor-pointer" @click="onClick">
    <slot />
  </a>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'

const router = useRouter()

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})

const onClick = () => {
  router.push(props.to)
}
</script>
