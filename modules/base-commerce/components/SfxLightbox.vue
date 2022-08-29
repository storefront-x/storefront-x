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

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
})

const lightbox = ref(null)

onMounted(() => {
  if (!lightbox.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: root.value,
      children: 'picture',
      pswpModule: () => import('photoswipe'),
    })

    // @ts-ignore
    lightbox.value?.addFilter('itemData', (itemData: any) => {
      const vm = itemData.element.__vue__

      return {
        src: vm.resizeImageFunction({ w: props.width, h: props.height }),
        width: props.width,
        height: props.height,
      }
    })

    // @ts-ignore
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
