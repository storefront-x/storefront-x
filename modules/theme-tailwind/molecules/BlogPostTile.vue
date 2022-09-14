<template>
  <div class="relative flex flex-col sm:rounded-lg shadow-lg overflow-hidden" data-cy="blog-post-tile">
    <Link :to="blogPost.urlKey" class="absolute inset-0" :aria-label="blogPost.title" />

    <div class="flex-shrink-0">
      <SfxImage
        class-img="h-48 w-full object-cover"
        :src="blogPost.listThumbnail"
        :width="400"
        :height="200"
        :alt="blogPost.title"
      />
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-indigo-600">
          <Link :href="blogPost.urlKey" class="relative"> Article </Link>
        </p>
        <Link :to="blogPost.urlKey" class="relative group block mt-2">
          <p class="text-xl font-semibold text-gray-900 group-hover:underline">
            {{ blogPost.title }}
          </p>
          <div class="mt-3 text-base text-gray-500" v-html="blogPost.shortContent" />
        </Link>
      </div>
      <div class="mt-6">
        <p class="text-sm font-medium text-gray-900">
          <Link href="#" class="relative"> Tester Testovič </Link>
        </p>
        <div class="flex space-x-1 text-sm text-gray-500">
          <div>
            {{ d(blogPost.publishedAt) }}
          </div>
          <span aria-hidden="true"> &middot; </span>
          <span>
            {{ t('{0} min read', [postReadingTime]) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import { computed, PropType, toRef } from 'vue'
import ToBlogPost from '#ioc/mappers/ToBlogPost'
import SfxImage from '#ioc/components/SfxImage'
import useI18n from '#ioc/composables/useI18n'
import usePost from '#ioc/composables/useBlogPost'
import stripHtml from '#ioc/utils/string/stripHtml'
import readingTime from '#ioc/utils/string/readingTime'

const { t, d } = useI18n()

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

const blogPost = usePost(toRef(props, 'blogPost'))

const postReadingTime = computed(() => {
  const strippedTags = stripHtml(blogPost.fullContent.content)

  return readingTime(strippedTags)
})
</script>

<i18n lang="yaml">
cs-CZ:
  '{0} min read': '{0} minut'
</i18n>
