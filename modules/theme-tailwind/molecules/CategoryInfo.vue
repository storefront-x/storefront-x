<template>
  <Heading :level="1" data-cy="title">{{ category.name }}</Heading>

  <div class="my-4">
    <SfxImage
      v-if="category.thumbnailUrl"
      :src="category.thumbnailUrl"
      :width="624"
      :height="416"
      fit="cover"
      class="float-left mr-4 w-1/2"
    />

    <div v-if="category.description" :level="2" v-html="category.description" />

    <div class="clear-both" />
  </div>
</template>

<script setup lang="ts">
import SfxImage from '#ioc/components/SfxImage'
import Heading from '#ioc/atoms/Heading'
import ToCategory from '#ioc/mappers/ToCategory'
import { PropType } from 'vue'

defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof ToCategory>>,
    default: () => ({}),
  },
})
</script>
