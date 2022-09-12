<template>
  <div ref="root">
    <slot />
  </div>
</template>

<script setup lang="ts">
import schedule from '#ioc/utils/schedule'
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

const lightbox = ref<any>(null)

onMounted(() => {
  schedule(async () => {
    // @ts-ignore
    const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox')

    lightbox.value = new PhotoSwipeLightbox({
      gallery: root.value,
      children: 'picture',
      pswpModule: () => import('photoswipe'),
    })

    lightbox.value.addFilter('itemData', (itemData: any) => {
      const vm = itemData.element.__vue__

      return {
        src: vm.resizeImage({ w: props.width, h: props.height }),
        width: props.width,
        height: props.height,
      }
    })

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
