<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    {{ post }}
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import injectPost from '#ioc/composables/injectPost'
import useHead from '#ioc/composables/useHead'
import { computed } from 'vue'

const post = injectPost()

useHead({
  title: computed(() => post.metaTitle),
  meta: [
    {
      name: 'description',
      content: computed(() => post.metaDescription),
    },
  ],
})
</script>
