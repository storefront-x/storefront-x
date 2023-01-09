<template>
  <SfxMagentoCmsPage :cms-page="{ content: product.descriptionHtml }" />
</template>

<script setup lang="ts">
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'
import injectProduct from '#ioc/composables/injectProduct'

const product = injectProduct()
</script>
