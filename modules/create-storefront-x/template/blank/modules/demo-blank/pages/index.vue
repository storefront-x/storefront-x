<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
import useHead from '#ioc/composables/useHead'
import { ref } from 'vue'

const title = ref('Hello, Storefront X!')

useHead({
  title,
})
</script>
