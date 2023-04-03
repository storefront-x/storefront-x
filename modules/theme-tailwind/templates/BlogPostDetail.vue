<template>
  <div class="relative overflow-hidden">
    <BackgroundTiles />

    <Prose>
      <Container class="relative">
        <Heading>{{ blogPost.title }}</Heading>

        <div v-html="blogPost.shortContent" />

        <SfxImage
          :src="blogPost.postThumbnail"
          :width="700"
          :height="450"
          :alt="blogPost.title"
          class-img="mt-4 rounded-lg"
        />
      </Container>

      <SfxMagentoCmsPage :cms-page="blogPost.fullContent" />
    </Prose>
  </div>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import useHead from '#ioc/composables/useHead'
import SfxImage from '#ioc/components/SfxImage'
import Prose from '#ioc/atoms/Prose'
import BackgroundTiles from '#ioc/atoms/BackgroundTiles'
import Heading from '#ioc/atoms/Heading'
import useBlogPost from '#ioc/composables/useBlogPost'
import { PropType, toRef } from 'vue'
import ToBlogPost from '#ioc/mappers/ToBlogPost'
import hydrateWhenIdle from '#ioc/utils/hydration/hydrateWhenIdle'
import useBlogPostSchema from '#ioc/composables/schemaOrg/useBlogPostSchema'

const SfxMagentoCmsPage = hydrateWhenIdle(() => import('#ioc/components/SfxMagentoCmsPage'))

const props = defineProps({
  id: {
    type: String as () => string | null,
    default: '',
  },
  blogPost: {
    type: Object as PropType<ReturnType<typeof ToBlogPost>>,
    required: true,
  },
})

const blogPost = useBlogPost(toRef(props, 'blogPost'))

useBlogPostSchema(blogPost)

let metaData = []
if (blogPost.metaDescription) {
  metaData.push({
    name: 'description',
    content: blogPost.metaDescription,
  })
}
if (blogPost.metaKeywords) {
  metaData.push({
    name: 'keywords',
    content: blogPost.metaKeywords,
  })
}
useHead({
  title: blogPost.metaTitle,
  meta: metaData,
})
</script>
