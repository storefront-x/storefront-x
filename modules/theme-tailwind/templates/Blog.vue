<template>
  <Container class="py-16">
    <div class="text-center">
      <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
        {{ t('title') }}
      </h2>
      <p class="mt-3 mx-auto text-xl text-gray-500 sm:mt-4">
        {{ t('subtitle') }}
      </p>
    </div>

    <template v-if="blogPostsSize">
      <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <BlogPostTile v-for="post in blogPosts" :key="post.id" :blog-post="post" />
      </div>

      <div class="flex justify-between items-center mt-8">
        <Pagination :total="blogPostsSize" :per-page="18" class="my-8" />
      </div>
    </template>

    <template v-else>
      <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {{ t('no posts') }}
      </div>
    </template>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import useI18n from '#ioc/composables/useI18n'
import ToBlogPost from '#ioc/mappers/ToBlogPost'
import hydrateWhenIdle from '#ioc/utils/hydration/hydrateWhenIdle'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'
import { PropType } from 'vue'

const BlogPostTile = hydrateWhenIdle(() => import('#ioc/molecules/BlogPostTile'))
const Pagination = hydrateWhenVisible(() => import('#ioc/molecules/Pagination'))

const { t } = useI18n()

defineProps({
  blogPosts: {
    type: Array as PropType<ReturnType<typeof ToBlogPost>[]>,
    default: () => [],
  },
  blogPostsSize: {
    type: Number,
    default: 0,
  },
})
</script>

<i18n lang="yaml">
en-US:
  title: Storefront-x blog
  subtitle: News from the Magento family.
  no posts: No blog posts found
cs-CZ:
  title: Storefront-x blog
  subtitle: Novinky a články ze světa Magento, stejně tak jako poslední novinky ze světa Storefront-x rodiny.
  no posts: Žádné články nenalezeny
</i18n>
