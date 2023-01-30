<template>
  <SfxLightbox :width="800" :height="800" class="flex flex-col">
    <div class="w-full aspect-w-1 aspect-h-1 relative">
      <SfxImage
        :src="product.thumbnailUrl"
        :alt="product.name"
        :width="600"
        :height="600"
        fit="contain"
        class-img="w-full max-h-96 object-center object-cover md:object-contain  rounded-lg hover:cursor-pointer"
        preload
      />
    </div>
    <div v-if="hasGallery" ref="gallery" class="w-full mt-5 grid grid-cols-4 sm:grid-cols-5 gap-4">
      <div v-for="image in images" :key="image.id" class="shrink-0">
        <SfxImage
          :id="image.id"
          :src="image.url"
          :alt="product.name"
          class-img="object-center object-cover rounded-lg border-2 transition hover:transition-all  hover:border-primary-600 hover:cursor-pointer"
          :lazy="true"
          :width="96"
          :height="96"
          fit="contain"
        />
      </div>
    </div>
  </SfxLightbox>
</template>

<script setup lang="ts">
import injectProduct from '#ioc/composables/injectProduct'
import SfxImage from '#ioc/components/SfxImage'
import { computed, ref } from 'vue'
import SfxLightbox from '#ioc/components/SfxLightbox'

const gallery = ref(null)

const product = injectProduct()

const hasGallery = computed(() => {
  return images?.value?.length > 1
})

const images = computed(() => product?.mediaGallery)
</script>
