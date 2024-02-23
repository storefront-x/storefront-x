<template>
  <Container class="hidden lg:flex flex-wrap">
    <CategoryLink
      v-for="category in catalogStore.menu"
      :key="category.id"
      :category="category"
      classes="p-2 text-primary-500 !font-bold text-base transition ease-in-out delay-[10ms] hover:bg-secondary-500"
      color="primary"
      @mouseenter="onMouseEnter(category.id)"
      @mouseleave="onMouseLeave(category.id)"
    >
      <FlyoutMenu v-if="selectedCategoryId === category.id" :categories="category.children" />
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

const selectedCategoryId = ref<number | null>()

watch(route, () => {
  selectedCategoryId.value = null
})

const onMouseEnter = (categoryId: number) => {
  selectedCategoryId.value = categoryId
}

const onMouseLeave = debounce((categoryId: number) => {
  if (selectedCategoryId.value === categoryId) {
    selectedCategoryId.value = null
  }
}, 250)
</script>
