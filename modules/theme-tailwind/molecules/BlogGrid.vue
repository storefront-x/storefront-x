<template>
  <div>
    <div class="text-center">
      <Heading :level="2" class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
        {{ t('title') }}
      </Heading>
      <p class="mt-3 mx-auto text-xl text-gray-500 sm:mt-4">
        {{ t('subtitle') }}
      </p>
    </div>
    <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <BlogPostTile v-for="blogPost in blogPosts" :key="blogPost.id" :blog-post="blogPost" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import BlogPostTile from '#ioc/molecules/BlogPostTile'
import useI18n from '#ioc/composables/useI18n'
import { defineProps } from 'vue'

const { t } = useI18n()

defineProps({
  blogPosts: {
    required: true,
    type: Array,
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  title: 'StoreFront X'
  subtitle: 'Nejnovější zprávy ze světa PWA, stejně tak jako poslední novinky z rodiny StoreFront X .'
en-US:
  title: StoreFront X
  subtitle: The hottest news from PWA world, the latest updates from SFX family.
</i18n>
