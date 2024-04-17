<template>
  <SfxCarousel :slides="slides" :interval="6000" :loop="true">
    <template #default="{ slide }">
      <img :src="slide.src" alt="" />
    </template>

    <template #pagination="{ pageIds, currentPage, showPage }">
      <div class="absolute w-full flex justify-center gap-4 bottom-0 p-4">
        <button
          v-for="pageId in pageIds"
          :key="pageId"
          class="w-4 h-4 rounded-full border cursor-pointer"
          :class="currentPage === pageId ? 'bg-black border-gray-700' : 'bg-white border-gray-300'"
          :aria-label="currentPage"
          @click="showPage(pageId)"
        />
      </div>
    </template>
  </SfxCarousel>
  <Container>
    <div class="mb-8">
      <HeadingBlock title="Novinky" />
      <ProductGrid :products="data.products" />
    </div>
  </Container>
</template>

<script setup lang="ts">
import SfxCarousel from '#ioc/components/SfxCarousel'
import Container from '#ioc/atoms/Container'
import { ref, onMounted } from 'vue'
import useHead from '#ioc/composables/useHead'
import useEmitPageViewHomepage from '#ioc/bus/emitters/useEmitPageViewHomepage'
import useGetProductsByIds from '#ioc/services/useGetProductsByIds'
import useResource from '#ioc/composables/useResource'
import ProductGrid from '#ioc/organisms/ProductGrid'
import HeadingBlock from '#ioc/atoms/HeadingBlock'

const emitPageViewHomepage = useEmitPageViewHomepage()
const getProductsByIds = useGetProductsByIds()

const [data] = await useResource(
  () => [
    'B0101-0006',
    'B0101-0005',
    'B0101-0004',
    'B0101-0003',
    'B0103-0005',
    'B0103-0006',
    'B0103-0003',
    'B0103-0002',
  ],
  (skus) => getProductsByIds(skus),
)

const slides = ref([
  {
    id: 1,
    title: 'Slide 1',
    description: 'Slide 1 description',
    src: '/images/slider/CZ_nadlimit_baner.png',
  },
  {
    id: 2,
    title: 'Slide 2',
    description: 'Slide 2 description',
    src: '/images/slider/P-10_CZ.jpg',
  },
  {
    id: 3,
    title: 'Slide 3',
    description: 'Slide 3 description',
    src: '/images/slider/SCORPION_CZ.jpg',
  },
])

onMounted(() => {
  emitPageViewHomepage()
})

useHead({
  title: 'CZUB.cz - CZ',
})
</script>
