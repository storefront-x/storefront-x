<template>
  <PostDetail v-if="data" :post="data.post" />

  <NotFound v-else />
</template>

<script setup lang="ts">
import useGetPostById from '#ioc/services/useGetPostById'
import useAsyncData from '#ioc/composables/useAsyncData'
import { defineAsyncComponent } from 'vue'
import PostDetail from '#ioc/templates/PostDetail'
const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))

const props = defineProps({
  id: {
    type: String as () => string | null,
    default: '',
  },
  relativeUrl: {
    type: String,
    required: true,
  },
})

const getPostById = useGetPostById()

const { data } = await useAsyncData('blogPost', () =>
  getPostById(
    props.relativeUrl
      .replace(/\.html$/, '')
      .split('/')
      .pop() ?? '',
  ),
)
</script>
