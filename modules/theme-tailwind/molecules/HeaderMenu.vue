<template>
  <Container class="hidden lg:flex space-x-8">
    <CategoryLink
      v-for="category in catalogStore.menu"
      :key="category.id"
      :category="category"
      classes="py-4 text-primary-500 font-semibold"
      color="primary"
    />
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import CategoryLink from '#ioc/molecules/HeaderMenu/CategoryLink'
import useCatalogStore from '#ioc/stores/useCatalogStore'

const catalogStore = useCatalogStore()
</script>
