<template>
  <div class="slider">
    <div class="keen-slider" :class="classSlider" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <div
        v-for="(slide, i) in x_slides"
        :key="i"
        class="keen-slider__slide"
        :style="{ pointerEvents: isDragging ? 'none' : 'auto' }"
        :class="classSlide"
      >
        <slot :slide="slide" :index="i" :is-dragging="isDragging" />
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

<script>
import 'keen-slider/keen-slider.min.css'
import { defineComponent } from 'vue'
import throttle from '#ioc/utils/throttle'
import schedule from '#ioc/utils/schedule'

export default defineComponent({
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
    interval: {
      type: Number,
      default: 0,
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
  },

  data() {
    return {
      slider: null,
      x_isMounted: false,
      x_pause: false,
      x_interval: null,
      x_options: null,
      currentPage: 0,
      isStartingToDrag: false,
      isDragging: false,
    }
  },

  computed: {
    x_slidesPerView() {
      return this.x_options?.slides?.perView ?? 1
    },

    x_slides() {
      return this.x_isMounted ? this.slides : this.slides.slice(0, this.x_slidesPerView)
    },

    pageCount() {
      return Math.ceil(this.slides.length / this.x_slidesPerView)
    },

    pageIds() {
      return [...Array(this.pageCount).keys()]
    },

    isFirstPage() {
      return this.currentPage === 0
    },

    isLastPage() {
      return this.currentPage === this.pageCount - 1
    },
  },

  watch: {
    x_slides() {
      if (this.slider) this.$nextTick(() => schedule(() => this.slider.update()))
    },
  },

  mounted() {
    schedule(async () => {
      const { default: KeenSlider } = await import('keen-slider')

      this.slider = new KeenSlider(this.$el, {
        initial: this.currentPage,
        loop: this.loop,
        breakpoints: this.breakpoints,
        dragStarted: () => this.onDragStart(),
        dragEnded: () => this.onDragEnd(),
        dragged: () => this.onMove(),
        slideChanged: (slider) => {
          this.currentPage = Math.floor(slider.track.details.rel / this.x_slidesPerView)
        },
      })
      this.slider.on('optionsChanged', () => ((this.x_options = this.slider.options), (this.currentPage = 0)), false)
      this.x_isMounted = true

      this.setInterval()
    })
  },

  unmounted() {
    clearInterval(this.x_interval)
    if (this.slider) this.slider.destroy()
  },

  methods: {
    onDragStart() {
      this.isStartingToDrag = true
      this.setPause(true)
    },

    onDragEnd() {
      this.isStartingToDrag = false
      this.isDragging = false
      this.setPause(false)
    },

    onMove: throttle(function () {
      if (this.isStartingToDrag) {
        this.isDragging = true
      }
    }, 100),

    setPause(active) {
      this.x_pause = active
      this.setInterval()
    },

    onMouseEnter() {
      this.setPause(true)
    },

    onMouseLeave() {
      this.setPause(false)
    },

    showPage(pageId) {
      const slideId = pageId * this.x_slidesPerView

      this.slider.moveToIdx(slideId, true)
    },

    showPrevSlide() {
      this.slider.prev()
    },

    showNextSlide() {
      this.slider.next()
    },

    setInterval() {
      if (!this.interval) return

      clearInterval(this.x_interval)

      this.x_interval = setInterval(() => {
        if (!this.x_pause) {
          const { abs } = this.slider.track.details
          this.slider.moveToIdx(abs + this.x_slidesPerView, true)
        }
      }, this.interval)
    },
  },
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
