<template>
  <div class="relative overflow-hidden">
    <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
      <div class="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
        <svg
          class="absolute top-12 left-full transform translate-x-32"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
        </svg>
        <svg
          class="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="f210dbf6-a58d-4871-961e-36d5016a0f49"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
        </svg>
        <svg
          class="absolute bottom-12 left-full transform translate-x-32"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="d3eb07ae-5182-43e6-857d-35c643af9034"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
        </svg>
      </div>
    </div>

    <Container class="relative">
      <Prose>
        <Heading>{{ blogPost.title }}</Heading>

        <div v-html="blogPost.shortContent" />

        <SfxImage :src="blogPost.postThumbnail" :width="700" :height="450" class-img="mt-4 rounded-lg" />
      </Prose>
    </Container>

    <SfxMagentoCmsPage :cms-page="blogPost.fullContent" />
  </div>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import useHead from '#ioc/composables/useHead'
import SfxImage from '#ioc/components/SfxImage'
import Prose from '#ioc/atoms/Prose'
import Heading from '#ioc/atoms/Heading'
import useBlogPost from '#ioc/composables/useBlogPost'
import { computed, PropType, toRef } from 'vue'
import useToBlogPost from '#ioc/mappers/useToBlogPost'
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'

const props = defineProps({
  id: {
    type: String as () => string | null,
    default: '',
  },
  blogPost: {
    type: Object as PropType<ReturnType<ReturnType<typeof useToBlogPost>>>,
    required: true,
  },
})

const blogPost = useBlogPost(toRef(props, 'blogPost'))

useHead({
  title: computed(() => blogPost.metaTitle),
  meta: [
    {
      name: 'description',
      content: computed(() => blogPost.metaDescription),
    },
  ],
})
</script>
