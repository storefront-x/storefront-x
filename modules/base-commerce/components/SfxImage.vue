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
import { defineComponent } from 'vue'
export default defineComponent({
  inheritAttrs: false,
})
</script>

<script setup lang="ts">
import ensureArray from '#ioc/utils/array/ensureArray'
import resizeImage from '#ioc/utils/url/resizeImage'
import { computed, PropType } from 'vue'

const props = defineProps({
  lazy: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
    default: null,
  },
  srcM2: {
    type: String,
    default: null,
  },
  srcSfx: {
    type: String,
    default: null,
  },
  srcErgonode: {
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
})

const source = computed(() => {
  return resizeImageFunction()
})

const sources = computed(() => {
  return ensureArray(props.format).map((format: string) => {
    const multiples = ensureArray(props.multiples).map(
      (multiple: number) => resizeImageFunction({ format, multiple }) + ` ${multiple}x`,
    )

    return [`image/${format}`, [resizeImageFunction({ format }), ...multiples].join(', ')]
  })
})

const loading = computed(() => {
  return props.lazy ? 'lazy' : 'eager'
})

const resizeImageFunction = ({ format = 'jpeg', multiple = 1, ...rest } = {}) => {
  return resizeImage({
    path: props.src,
    m2: props.srcM2,
    sfx: props.srcSfx,
    ergonode: props.srcErgonode,
    w: props.width && props.width * multiple,
    h: props.height && props.height * multiple,
    fit: props.fit,
    format,
    ...rest,
  })
}
</script>
