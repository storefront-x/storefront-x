<template>
  <div class="flex flex-col" :class="classes" :style="styles">
    <div :style="wrapperStyles">
      <div class="p-4 max-w-full" v-html="content" />
      <RouterLink v-if="showButton === 'always'" class="btn btn-primary" :to="link">
        {{ buttonText }}
      </RouterLink>
    </div>
  </div>
</template>

<script>
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbBanner from '#ioc/mixins/IsPbBanner'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [IsPbBlock, IsPbBanner],

  computed: {
    classes() {
      return {
        'justify-center': this.appearance === 'poster',
      }
    },

    styles() {
      return {
        ...this.advanced,
        ...this.background,
        minHeight: this.minHeight,
      }
    },

    wrapperStyles() {
      return {
        textAlign: this._textAlign,
      }
    },

    _textAlign() {
      if (this.appearance === 'collage-left') return 'left'
      if (this.appearance === 'collage-centered') return 'center'
      if (this.appearance === 'collage-right') return 'right'
      return undefined
    },
  },
})
</script>
