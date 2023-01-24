<template>
  <iframe
    :src="pbVideo.src"
    :autoplay="pbVideo.autoplay"
    :muted="pbVideo.muted"
    class="w-full aspect-video"
    :style="styles"
  />
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import usePbVideo from '#ioc/composables/cms/usePbVideo'

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbVideo = usePbVideo(props.el)

const styles = computed(() => {
  return { ...pbVideo.advanced }
})
</script>
