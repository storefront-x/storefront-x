<template>

  AMASTY POST

  <div v-if="data">
    {{ data }}
  </div>

  <NotFound v-else />
</template>

<script setup lang="ts">
import useGetPostById from '#ioc/services/useGetPostById'
import useAsyncData from '#ioc/composables/useAsyncData'
import { defineAsyncComponent } from 'vue'

const NotFound = defineAsyncComponent(() => import('#ioc/templates/NotFound'))

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  relativeUrl: {
    type: String,
    required: true,
  },
})

const getPostById = useGetPostById()

const { data } = await useAsyncData('post', () => getPostById(props.relativeUrl.replace(/\.html$/, '')))
</script>
