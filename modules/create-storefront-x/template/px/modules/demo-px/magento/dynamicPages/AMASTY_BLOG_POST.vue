<template>
  <BlogPostDetail v-if="data" :blog-post="data.blogPost" />

  <NotFound v-else />
</template>

<script setup lang="ts">
import useGetBlogPostByUrl from '#ioc/services/useGetBlogPostByUrl'
import useAsyncData from '#ioc/composables/useAsyncData'
import { defineAsyncComponent } from 'vue'
import BlogPostDetail from '#ioc/templates/BlogPostDetail'
import { onMounted } from 'vue'
import useEmitPageViewAmastyBlogPost from '#ioc/bus/emitters/useEmitPageViewAmastyBlogPost'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))

const props = defineProps({
  id: {
    type: String as () => string | null,
    default: '',
  },
  relativeUrl: {
    type: String,
    required: true,
  },
})

const getBlogPostByUrl = useGetBlogPostByUrl()
const emitPageViewAmastyBlogPost = useEmitPageViewAmastyBlogPost()

const { data } = await useAsyncData('blogPost', () =>
  getBlogPostByUrl(
    props.relativeUrl
      .replace(/\.html$/, '')
      .split('/')
      .pop() ?? '',
  ),
)

onMounted(() => {
  emitPageViewAmastyBlogPost()
})
</script>
