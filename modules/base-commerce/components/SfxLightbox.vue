<template>
  <div ref="root">
    <slot />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import { onMounted, onUnmounted, ref } from 'vue'

const root = ref(null)

defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
})

const lightbox = ref<any>(null)

onMounted(() => {
  if (!lightbox.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: root.value,
      children: 'picture',
      pswpModule: () => import('photoswipe'),
    })

    // TODO: Implement lightbox

    lightbox.value?.init()
  }
})

onUnmounted(() => {
  if (lightbox.value) {
    // @ts-ignore
    lightbox.value.destroy()
    lightbox.value = null
  }
})
</script>
