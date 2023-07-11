<template>
  <Container class="py-16">
    <div class="text-center">
      <Heading :level="2" data-cy="title">
        {{ blogCategory.name }}
      </Heading>
    </div>

    <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <BlogPostTile v-for="blogPost in blogPosts" :key="blogPost.id" :blog-post="blogPost" />
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Heading from '#ioc/atoms/Heading'
import BlogPostTile from '#ioc/molecules/BlogPostTile'
import useGetBlogCategoryById from '#ioc/services/useGetBlogCategoryById'
import useGetBlogPosts from '#ioc/services/useGetBlogPosts'
import useRoute from '#ioc/composables/useRoute'
import useAsyncData from '#ioc/composables/useAsyncData'
import useHead from '#ioc/composables/useHead'
import useBlogCategorySchema from '#ioc/composables/schemaOrg/useBlogCategorySchema'
import { onMounted } from 'vue'
import useEmitPageViewBlogCategory from '#ioc/bus/emitters/useEmitPageViewBlogCategory'

const getBlogCategoryById = useGetBlogCategoryById()
const getBlogPosts = useGetBlogPosts()
const route = useRoute()

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})

const emitPageViewBlogCategory = useEmitPageViewBlogCategory()

const {
  data: {
    value: { blogCategory },
  },
} = await useAsyncData('blogCategory', () => getBlogCategoryById(props.id))
const {
  data: {
    value: { blogPosts },
  },
} = await useAsyncData('blogPosts', () => getBlogPosts('CATEGORY', props.id, Number(route.query.page ?? 1)))

useBlogCategorySchema(blogCategory)

let metaData = []
if (blogCategory.meta.description) {
  metaData.push({
    name: 'description',
    content: blogCategory.meta.description,
  })
}
if (blogCategory.meta.keywords) {
  metaData.push({
    name: 'keywords',
    content: blogCategory.meta.keywords,
  })
}

useHead({
  title: blogCategory.meta.title,
  meta: metaData,
})

onMounted(() => {
  emitPageViewBlogCategory()
})
</script>
