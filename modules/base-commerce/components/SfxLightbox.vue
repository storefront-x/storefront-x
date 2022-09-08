<template>
  <div ref="root">
    <slot />
  </div>
</template>

<script setup lang="ts">
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
  requestIdleCallback(async () => {
    // @ts-ignore
    const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox')

    lightbox.value = new PhotoSwipeLightbox({
      gallery: root.value,
      children: 'picture',
      pswpModule: () => import('photoswipe'),
    })

    // TODO: Implement lightbox

    lightbox.value?.init()
  })
})

onUnmounted(() => {
  if (lightbox.value) {
    // @ts-ignore
    lightbox.value.destroy()
    lightbox.value = null
  }
})
</script>
