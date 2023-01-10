<template>
  <SfxMagentoCmsPage :cms-page="{ content: description }" />
</template>

<script setup lang="ts">
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'

defineProps({
  description: {
    type: String,
    default: null,
  },
})
</script>
