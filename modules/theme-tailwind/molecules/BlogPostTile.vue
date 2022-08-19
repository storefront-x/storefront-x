<template>
  <div class="relative flex flex-col sm:rounded-lg shadow-lg overflow-hidden" data-cy="blog-post-tile">
    <div class="flex-shrink-0">
      <SfxImage
        class-img="h-48 w-full object-cover"
        :src="post.listThumbnail"
        :width="400"
        :height="200"
        :alt="post.title"
      />
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-indigo-600">
          <Link :href="post.urlKey" class="relative"> Article </Link>
        </p>
        <Link :to="post.urlKey" class="relative group block mt-2">
          <p class="text-xl font-semibold text-gray-900 group-hover:underline">
            {{ post.title }}
          </p>
          <div class="mt-3 text-base text-gray-500" v-html="post.shortContent" />
        </Link>
      </div>
      <div class="mt-6">
        <p class="text-sm font-medium text-gray-900">
          <Link href="#" class="relative"> Tester Testovič </Link>
        </p>
        <div class="flex space-x-1 text-sm text-gray-500">
          <div>
            {{ d(post.publishedAt) }}
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
import useToPost from '#ioc/mappers/useToPost'
import SfxImage from '#ioc/components/SfxImage'
import useI18n from '~/modules/vue-i18n/composables/useI18n'
import usePost from '~/modules/blog/composables/usePost'
import stripHtml from '#ioc/utils/string/stripHtml'
import readingTime from '#ioc/utils/string/readingTime'

const { t, d } = useI18n()

const props = defineProps({
  id: {
    type: String as () => string | null,
    default: '',
  },
  post: {
    type: Object as PropType<ReturnType<ReturnType<typeof useToPost>>>,
    required: true,
  },
})

const post = usePost(toRef(props, 'post'))

const postReadingTime = computed(() => {
  const strippedTags = stripHtml(post.fullContent.content)

  return readingTime(strippedTags)
})
</script>

<i18n lang="yaml">
cs-CZ:
  '{0} min read': '{0} minut'
</i18n>
