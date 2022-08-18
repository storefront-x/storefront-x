<template>
  <slot />
</template>

<script setup lang="ts">
import useToPost from '#ioc/mappers/useToProduct'
import providePost from '#ioc/composables/providePost'
import { computed, PropType } from 'vue'

const props = defineProps({
  post: {
    type: Object as PropType<ReturnType<ReturnType<typeof useToPost>>>,
    required: true,
  },
})

providePost(computed(() => props.post))
</script>
