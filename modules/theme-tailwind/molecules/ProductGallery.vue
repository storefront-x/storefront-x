<template>
  <div v-if="hasGallery" ref="gallery" class="w-full mt-5 grid grid-cols-4 sm:grid-cols-5 gap-4">
    <div v-for="(image, index) in product.images.slice(0, 1)" :key="image.id" class="shrink-0" @click="select(index)">
      <SfxImage
        :id="image.id"
        :src="image.url"
        class-img="object-center object-cover rounded-lg border-2 transition hover:transition-all  hover:border-primary-600 hover:cursor-pointer"
        preload
        :class="index === selected && 'border-primary-600'"
        :lazy="true"
        :width="96"
        :height="96"
        fit="contain"
      />
    </div>
  </div>
</template>

<script>
import injectProduct from '#ioc/composables/injectProduct'
import SfxImage from '#ioc/components/SfxImage'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    SfxImage,
  },

  setup() {
    const product = injectProduct()

    return {
      product,
    }
  },

  data: () => ({
    selected: 0,
  }),

  computed: {
    hasGallery() {
      return this.product.images.length > 1
    },
  },

  methods: {
    select(index) {
      this.selected = index
    },
  },
})
</script>
