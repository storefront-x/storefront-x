<template>
  <div v-intersection-observer="onIntersectionObserver" class="flex flex-col" :class="classes" :style="styles">
    <div class="hidden lg:flex absolute inset-0" :style="desktopBannerImage" />
    <div class="flex lg:hidden absolute inset-0" :style="mobileBannerImage" />

    <div class="z-10" :style="{ textAlign: _textAlign }">
      <div class="p-4 max-w-full content" v-html="pbBanner.content" />
      <RouterLink v-if="pbBanner.showButton === 'always'" class="btn btn-primary" :to="localePath(pbBanner.link ?? '')">
        {{ pbBanner.buttonText }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePbBanner from '#ioc/composables/cms/usePbBanner'
import useLocalePath from '#ioc/composables/useLocalePath'
import { computed, PropType, ref } from 'vue'
import vIntersectionObserver from '#ioc/directives/vIntersectionObserver'

const props = defineProps({
  el: {
    type: Object as PropType<HTMLElement>,
    default: null,
  },
  index: {
    type: Number,
    default: -1,
  },
})

const isVisible = ref(props.index === 0)

const localePath = useLocalePath()
const pbBanner = usePbBanner(props.el)

const classes = computed(() => {
  return {
    'justify-center': pbBanner.appearance === 'poster',
  }
})

const styles = computed(() => {
  return {
    ...pbBanner.advanced,
    minHeight: pbBanner.minHeight,
  }
})

const desktopBannerImage = computed(() => (isVisible.value ? pbBanner.background : ''))
const mobileBannerImage = computed(() => (isVisible.value ? pbBanner.mobileBackground : ''))

const _textAlign = computed(() => {
  if (pbBanner.appearance === 'collage-left') return 'left'
  if (pbBanner.appearance === 'collage-centered') return 'center'
  if (pbBanner.appearance === 'collage-right') return 'right'
  return undefined
})

const onIntersectionObserver = ([{ isIntersecting }]: any) => {
  isVisible.value = isIntersecting
}
</script>
