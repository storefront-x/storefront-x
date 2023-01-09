<template>
  <div v-html="product.descriptionHtml"></div>
</template>

<script setup lang="ts">
import injectProduct from '#ioc/composables/injectProduct'

const product = injectProduct()
</script>
