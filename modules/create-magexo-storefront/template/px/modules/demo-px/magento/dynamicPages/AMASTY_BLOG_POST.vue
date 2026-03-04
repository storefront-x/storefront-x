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
import useEmitPageViewBlogPost from '#ioc/bus/emitters/useEmitPageViewBlogPost'

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
const emitPageViewBlogPost = useEmitPageViewBlogPost()

const { data } = await useAsyncData('blogPost', () =>
  getBlogPostByUrl(
    props.relativeUrl
      .replace(/\.html$/, '')
      .split('/')
      .pop() ?? '',
  ),
)

onMounted(() => {
  emitPageViewBlogPost()
})
</script>
