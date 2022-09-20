<template>
  <div
    v-if="categories?.length"
    class="absolute bg-white inset-x-0 text-gray-500 z-20 border-b-2 border-primary-400 shadow-md"
  >
    <Container class="relative flex py-8">
      <div class="w-full grid grid-cols-4 gap-y-10 gap-x-8">
        <FlyoutMenuSubCategory
          v-for="category in categories"
          :key="category.id"
          :category="category"
          classes="py-4 text-primary-500 font-semibold"
          color="primary"
        />
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import ToCategory from '#ioc/mappers/ToCategory'
import FlyoutMenuSubCategory from '#ioc/molecules/HeaderMenu/FlyoutMenuSubCategory'
import { PropType } from 'vue'

defineProps({
  categories: {
    type: Array as PropType<ReturnType<typeof ToCategory>[]>,
    required: true,
  },
})
</script>
