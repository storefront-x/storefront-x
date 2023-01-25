<template>
  <div class="hidden lg:flex bg-primary-500 border-b-[3px] border-primary-900">
    <Container class="hidden lg:flex bg-primary-500">
      <CategoryLink
        v-for="(category, index) in catalogStore.menu"
        :key="category.id"
        :category="category"
        classes="px-2 py-[4px] text-white text-center text-[14px] font-medium hover:no-underline hover:bg-primary-900"
        :class="{
          'bg-red-400': index === 0 || index + 1 === catalogStore.menu.length,
          'hover:bg-red-555': index === 0 || index + 1 === catalogStore.menu.length,
        }"
        color="white"
        @mouseenter="onMouseEnter(category)"
        @mouseleave="onMouseLeave(category)"
        @mouseout="removeTimeout"
      >
        <FlyoutMenu v-if="selectedCategory === category" class="mt-1" :categories="category.children" />
      </CategoryLink>
    </Container>
  </div>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import CategoryLink from '#ioc/molecules/HeaderMenu/CategoryLink'
import useCatalogStore from '#ioc/stores/useCatalogStore'
import { ref, watch } from 'vue'
import FlyoutMenu from '#ioc/molecules/FlyoutMenu'
import debounce from '#ioc/utils/debounce'
import useRoute from '#ioc/composables/useRoute'
const catalogStore = useCatalogStore()
const route = useRoute()
const selectedCategory = ref()
const timeout = ref()
watch(route, () => {
  selectedCategory.value = null
})
const onMouseEnter = (category: any) => {
  if (!selectedCategory.value) {
    timeout.value = setTimeout(() => {
      selectedCategory.value = category
    }, 250)
  } else {
    selectedCategory.value = category
  }
}
const removeTimeout = () => {
  if (!timeout.value) return
  clearTimeout(timeout.value)
  timeout.value = undefined
}
const onMouseLeave = debounce((category: any) => {
  if (selectedCategory.value === category) {
    selectedCategory.value = undefined
  }
}, 250)
</script>
