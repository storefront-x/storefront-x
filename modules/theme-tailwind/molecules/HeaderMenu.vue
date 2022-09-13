<template>
  <Container class="hidden lg:flex space-x-8">
    <CategoryLink
      v-for="category in catalogStore.menu"
      :key="category.id"
      :category="category"
      classes="py-4 text-primary-500 font-semibold hover:underline"
      color="primary"
      @mouseenter="onMouseEnter(category)"
      @mouseleave="onMouseLeave(category)"
      @mouseout="removeTimeout"
    >
      <FlyoutMenu v-if="selectedCategory === category" :categories="category.children" />
    </CategoryLink>
  </Container>
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
