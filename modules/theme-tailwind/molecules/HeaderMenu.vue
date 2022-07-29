<template>
  <Container class="hidden lg:flex space-x-8">
    <Link
      v-for="category in catalogStore.menu"
      :key="category.id"
      :to="category.urlPath"
      color="primary"
      class="py-4 text-primary-500 font-semibold"
    >
      {{ category.name }}
    </Link>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Link from '#ioc/atoms/Link'
import useCatalogStore from '#ioc/stores/useCatalogStore'

const catalogStore = useCatalogStore()
</script>
