<template>
  <Blog :blog-posts="data.blogPosts" :blog-posts-size="data.blogPostsSize" />
</template>

<script setup lang="ts">
import Blog from '#ioc/templates/Blog'
import useGetBlogPosts from '#ioc/services/useGetBlogPosts'
import useAsyncData from '#ioc/composables/useAsyncData'
import useRoute from '#ioc/composables/useRoute'

const route = useRoute()
const getBlogPosts = useGetBlogPosts()

const { data } = await useAsyncData('blogPosts', () => getBlogPosts('ALL', undefined, Number(route.query.page || 1)))
</script>
