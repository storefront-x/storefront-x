<template>
  <Accordion :heading-class="['px-4', 'py-4', 'border-t-2', 'border-gray-50', 'justify-between']">
    <template #heading>
      <div class="items-center flex text-left">
        <SfxImage v-if="category.thumbnailUrl" :src="category.thumbnailUrl" class="w-7 h-7" lazy></SfxImage>
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
</template>

<script setup lang="ts">
import CategoryLink from '#ioc/molecules/HeaderMenu/CategoryLink'
import useCategory from '#ioc/composables/useCategory'
import useToCategory from '#ioc/mappers/useToCategory'
import SfxImage from '#ioc/components/SfxImage'
import { PropType, computed } from 'vue'
import Accordion from '#ioc/atoms/Accordion'

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<ReturnType<typeof useToCategory>>>,
    required: true,
  },
})

const category = useCategory(computed(() => props.category))
</script>
