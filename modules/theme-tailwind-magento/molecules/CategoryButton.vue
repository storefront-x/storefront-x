<template>
  <Link
    :to="category.urlPath"
    class="bg-white border border-gray-400 p-2 rounded-md transition ease-in-out delay-75 hover:no-underline"
  >
    <div class="flex flex-row my-1 items-center">
      <SfxImage
        v-if="hasImage"
        class="mr-2"
        :src="category.thumbnailUrl"
        class-img="h-6 w-6 rounded-full border-1"
        fit="contain"
        :alt="category.name"
      />
      <div class="leading-5 sm truncate whitespace-nowrap overflow-hidden">
        <span>{{ category.name }}</span>
      </div>

      <span v-if="hasCount" class="text-gray-400 pl-1 ml-auto">({{ props.category.productsTotalCount }})</span>
    </div>
  </Link>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import SfxImage from '#ioc/components/SfxImage'
import useCategory from '#ioc/composables/useCategory'
import ToCategory from '#ioc/mappers/ToCategory'
import { computed, PropType, toRef } from 'vue'

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof ToCategory>>,
    required: true,
  },
})

const category = useCategory(toRef(props, 'category'))

const hasImage = computed(() => {
  return !!category.thumbnailUrl
})

const hasCount = computed(() => {
  return props.category.productsTotalCount > 0
})
</script>
