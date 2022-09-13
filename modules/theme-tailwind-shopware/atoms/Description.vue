<template>
  <SfxShopwareCmsPage :cms-page="{ content: description }" />
</template>

<script setup lang="ts">
import SfxShopwareCmsPage from '#ioc/components/SfxShopwareCmsPage'

defineProps({
  description: {
    type: String,
    default: null,
  },
})
</script>
