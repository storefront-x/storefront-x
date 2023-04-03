<template>
  <div v-intersection-observer="onIntersectionObserver" class="flex flex-col" :class="classes" :style="styles">
    <div :style="{ textAlign: _textAlign }">
      <div class="p-4 max-w-full" v-html="pbBanner.content" />
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
    'bannerImage': isVisible.value,
  }
})

const styles = computed(() => {
  const background = isVisible.value ? pbBanner.backgroundStyles : ''
  return {
    ...pbBanner.advanced,
    ...background,
    minHeight: pbBanner.minHeight,
  }
})

const backgroundImageDesktop = computed(() => pbBanner?.backgroundImages?.backgroundImageDesktop ?? '')
const backgroundImageMobile = computed(() => pbBanner?.backgroundImages?.backgroundImageMobile ?? '')

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
<style scoped>
.bannerImage {
  background-image: v-bind(backgroundImageMobile);
}

@media screen(lg) {
  .bannerImage {
    background-image: v-bind(backgroundImageDesktop);
  }
}
</style>
