<template>
  <picture>
    <source v-for="([type, srcset], i) in sources" :key="i" :srcset="srcset" :type="type" />

    <img
      v-bind="$attrs"
      :src="source"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :class="classImg"
    />
  </picture>
</template>

<script lang="ts">
import ensureArray from '#ioc/utils/array/ensureArray'
import resizeImage from '#ioc/utils/url/resizeImage'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  inheritAttrs: false,

  props: {
    lazy: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: null,
    },
    srcSfx: {
      type: String,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    fit: {
      type: String as PropType<'cover' | 'contain' | 'fill' | 'inside' | 'outside'>,
      default: null,
      validator: (value: string) => ['cover', 'contain', 'fill', 'inside', 'outside'].includes(value),
    },
    format: {
      type: [Array, String],
      default: () => ['webp', 'jpeg'],
    },
    multiples: {
      type: [Array, Number],
      default: () => [],
    },
    alt: {
      type: String,
      default: undefined,
    },
    classImg: {
      type: [String, Array, Object],
      default: undefined,
    },
    preload: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    source() {
      return this.resizeImage()
    },

    sources() {
      return ensureArray(this.format).map((format: string) => {
        const multiples = ensureArray(this.multiples).map(
          (multiple: number) => this.resizeImage({ format, multiple }) + ` ${multiple}x`,
        )

        return [`image/${format}`, [this.resizeImage({ format }), ...multiples].join(', ')]
      })
    },

    loading() {
      return this.lazy ? 'lazy' : 'eager'
    },
  },

  methods: {
    resizeImage({ format = 'jpeg', multiple = 1, ...rest } = {}) {
      return resizeImage({
        path: this.src,
        sfx: this.srcSfx,
        w: this.width && this.width * multiple,
        h: this.height && this.height * multiple,
        fit: this.fit,
        format,
        ...rest,
      })
    },
  },
})
</script>
