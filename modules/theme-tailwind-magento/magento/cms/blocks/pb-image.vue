<template>
  <render />
</template>

<script setup lang="ts">
import usePbBlock from '#ioc/composables/cms/usePbBlock'
import usePbImage from '#ioc/composables/cms/usePbImage'
import SfxImage from '#ioc/components/SfxImage'
import { computed, h, PropType, resolveComponent } from 'vue'

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbBlock = usePbBlock(props.el)
const pbImage = usePbImage(props.el)

const styles = computed(() => {
  return { ...pbBlock.advanced }
})

const imageFragment = () => {
  const img = h(SfxImage, {
    src: pbImage.src,
    alt: pbImage.alt,
    lazy: true,
    title: pbImage.title,
    class: '',
    style: styles.value,
  })

  if (pbImage.caption) {
    return h('figure', [img, h('figcaption', [pbImage.caption])])
  }

  return img
}

const render = () => {
  if (!pbImage.src) return null

  if (pbImage.link) {
    if (pbImage.link.startsWith('/')) {
      return h(
        resolveComponent('RouterLink'),
        { to: pbImage.link, target: pbImage.openInNewTab ? '_blank' : '_self' },
        [imageFragment()],
      )
    } else {
      return h(resolveComponent('a'), { href: pbImage.link, target: pbImage.openInNewTab ? '_blank' : '_self' }, [
        imageFragment(),
      ])
    }
  } else {
    return imageFragment()
  }
}
</script>

<style scoped>
picture:deep(img) {
  object-fit: cover;
}
</style>
