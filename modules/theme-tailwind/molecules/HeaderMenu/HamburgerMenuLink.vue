<template>
  <Accordion
    v-if="category.children.length > 0"
    :heading-class="['px-4', 'py-4', 'border-t-2', 'border-gray-50', 'justify-between']"
  >
    <template #heading>
      <div class="items-center flex text-left">
        <SfxImage v-if="category.thumbnailUrl" :height="28" :width="28" :src="category.thumbnailUrl" lazy></SfxImage>
        <span class="ml-2">
          {{ category.name }}
        </span>
      </div>
    </template>
    <template #default>
      <ul role="list" class="list-none">
        <li v-for="child in category.children" :key="child.id" class="px-6 py-2 border-t-2 border-gray-50">
          <CategoryLink :category="child" classes="no-underline -m-2 p-2 block text-gray-500" color="gray" />
        </li>
      </ul>
    </template>
  </Accordion>
  <RouterLink
    v-else
    :to="category.urlPath"
    class="items-center flex text-left ml-2 px-4 py-4 border-t-2 border-gray-50 justify-between"
  >
    <SfxImage
      v-if="category.thumbnailUrl"
      :src="category.thumbnailUrl"
      :height="28"
      :width="28"
      class="w-7 h-7"
      lazy
    ></SfxImage>
    {{ category.name }}
  </RouterLink>
</template>

<script setup lang="ts">
import CategoryLink from '#ioc/molecules/HeaderMenu/CategoryLink'
import useCategory from '#ioc/composables/useCategory'
import ToCategory from '#ioc/mappers/ToCategory'
import SfxImage from '#ioc/components/SfxImage'
import { PropType, computed } from 'vue'
import Accordion from '#ioc/atoms/Accordion'

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof ToCategory>>,
    required: true,
  },
})

const category = useCategory(computed(() => props.category))
</script>
