<template>
  <div class="slider">
    <div
      ref="container"
      class="keen-slider"
      :class="classSlider"
      @mouseenter="setPause()"
      @mouseleave="sliderAutoDragPlay()"
      @pointerenter="setPause()"
      @pointerleave="sliderAutoDragPlay()"
    >
      <div
        v-for="(slide, i) in visibleSlides"
        :key="i"
        class="keen-slider__slide"
        :style="{ pointerEvents: isDragging ? 'none' : 'auto' }"
        :class="classSlide"
      >
        <slot :slide="slide" :index="i" />
      </div>
    </div>

    <slot
      name="controls"
      v-bind="{
        isLastPage,
        isFirstPage,
        showPrevSlide,
        showNextSlide,
      }"
    />

    <slot name="pagination" v-bind="{ pageIds, currentPage, pageCount, showPage }" />
  </div>
</template>

<script setup lang="ts">
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/vue'
import { onMounted, onUnmounted, computed, ref, nextTick } from 'vue'
const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
  initSlidesPerView: {
    type: Number,
    default: 1,
  },
  interval: {
    type: Number,
    default: 6000,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  breakpoints: {
    type: Object,
    default: () => ({}),
  },
  classSlider: {
    type: String,
    default: null,
  },
  classSlide: {
    type: String,
    default: null,
  },
})

const visibleSlides = ref(props.slides.slice(0, props.initSlidesPerView))
let sliderOptions = ref()
const currentPage = ref(0)
const isDragging = ref(false)
const sliderAutoDragInterval = ref()

const slidesPerView = computed(() => {
  return sliderOptions.value?.slides?.perView ?? props.initSlidesPerView
})

const pageCount = computed(() => {
  return Math.ceil(props.slides.length / slidesPerView.value)
})

const pageIds = computed(() => {
  return [...Array(pageCount.value).keys()]
})

const isFirstPage = computed(() => {
  return currentPage.value === 0
})

const isLastPage = computed(() => {
  return currentPage.value === pageCount.value - 1
})

const [container, slider] = useKeenSlider({
  slides: {
    perView: props.initSlidesPerView,
  },
  initial: currentPage.value,
  loop: props.loop,
  breakpoints: props.breakpoints,
  dragged: () => (isDragging.value = true),
  dragEnded: () => (isDragging.value = false),
  created: async (sliderChanged) => {
    sliderOptions.value = sliderChanged?.options

    await nextTick()

    slider.value?.update()
  },
  optionsChanged: (sliderChanged) => {
    sliderOptions.value = sliderChanged?.options
  },
  slideChanged: (sliderChanged) => {
    currentPage.value = Math.floor(sliderChanged.track.details.rel / slidesPerView.value)
  },
})

function showPrevSlide() {
  slider.value?.prev()
}

function showNextSlide() {
  slider.value?.next()
}

function showPage(pageId: number) {
  const slideId = pageId * slidesPerView.value
  slider.value?.moveToIdx(slideId, true)
}

function sliderAutoDragPlay() {
  sliderAutoDragInterval.value = setInterval(() => {
    slider.value?.next()
  }, props.interval)
}

function setPause() {
  clearInterval(sliderAutoDragInterval.value)
}

onMounted(() => {
  visibleSlides.value = props.slides
  sliderAutoDragPlay()
})

onUnmounted(() => {
  slider.value?.destroy()
})
</script>
<style scoped>
.slider {
  position: relative;
}

/* Fix for LCP */
.keen-slider__slide {
  width: 100%;
  overflow: hidden;
}
</style>
