<template>
  <div>
    <div class="flex items-center">
      <Link :to="localePath(category.urlPath)" color="black" class="font-bold flex items-center hover:underline">
        <SfxImage
          v-if="category.thumbnailUrl"
          class="mr-2"
          :src="category.thumbnailUrl"
          class-img="h-12 w-12 font-normal rounded-full border-1"
        ></SfxImage>
        {{ category.name }}
      </Link>
    </div>

    <ul v-if="category?.children?.length" role="list" class="mt-4 space-y-2 sm:mt-2 sm:space-y-1">
      <li v-for="child in category.children.slice(0, 4)" :key="child.id" class="flex">
        <FlyoutMenuSubCategoryChild :category="child"> </FlyoutMenuSubCategoryChild>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import FlyoutMenuSubCategoryChild from '#ioc/molecules/HeaderMenu/FlyoutMenuSubCategoryChild'
import useCategory from '#ioc/composables/useCategory'
import ToCategory from '#ioc/mappers/ToCategory'
import SfxImage from '#ioc/components/SfxImage'
import { PropType, computed } from 'vue'
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof ToCategory>>,
    required: true,
  },
})

const category = useCategory(computed(() => props.category))
</script>
