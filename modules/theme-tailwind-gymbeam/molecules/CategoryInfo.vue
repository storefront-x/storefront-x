<template>
  <div class="">
    <h1 data-cy="title" class="text-xl mb-0">{{ category.name }}</h1>
    <template v-if="category.description">
      <div :class="extendedDescription ? 'extended' : 'short'" v-html="category.description"></div>
      <p class="text-secondary-500 cursor-pointer" @click="extendedDescription = !extendedDescription">
        {{ extendedDescription ? 'Zobraziť menej' : 'Zobraziť viac' }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import useCategory from '#ioc/composables/useCategory'

defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof useCategory>>,
    required: true,
  },
})
const extendedDescription = ref(false)
</script>
<style scoped>
.extended {
  height: 100%;
}
.short {
  height: 100px;
  overflow: hidden;
}
</style>
