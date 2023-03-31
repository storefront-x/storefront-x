<template>
  <div v-intersection-observer="onIntersectionObserver" class="flex flex-col" :class="classes" :style="styles">
    <Container v-if="containerContent">
      <div :style="{ textAlign: _textAlign }">
        <div class="p-4 max-w-full content" v-html="pbBanner.content" />
        <RouterLink
          v-if="pbBanner.showButton === 'always'"
          class="inline-block py-3 px-4 ml-4 focus:outline-none rounded-lg text-xs focus:ring-2 focus:ring-offset-2 bg-primary-555 text-white font-bold hover:bg-secondary-500"
          :to="localePath(pbBanner.link ?? '')"
        >
          {{ pbBanner.buttonText }}
        </RouterLink>
      </div>
    </Container>
    <div v-else :style="{ textAlign: _textAlign }">
      <div class="p-4 max-w-full" v-html="pbBanner.content" />
      <RouterLink v-if="pbBanner.showButton === 'always'" class="btn btn-primary" :to="localePath(pbBanner.link ?? '')">
        {{ pbBanner.buttonText }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import usePbBanner from '#ioc/composables/cms/usePbBanner'
import useLocalePath from '#ioc/composables/useLocalePath'
import { computed, PropType, ref, inject } from 'vue'
import vIntersectionObserver from '#ioc/directives/vIntersectionObserver'

const containerContent = inject('containerContent', false)

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
.content :deep(h2 span),
.content :deep(h1 span) {
  text-shadow: 1px 1px 7px #333;
  @apply !text-2xl md:!text-4xl xl:!text-6xl;
}

.content :deep(p) {
  text-shadow: 1px 1px 7px #333;
  @apply text-lg md:text-xl font-bold;
}

.content :deep(h3 span) {
  @apply !text-xl md:!text-2xl;
}
</style>
