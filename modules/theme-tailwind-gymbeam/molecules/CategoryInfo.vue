<template>
  <div>
    <h1 data-cy="title">{{ category.name }}</h1>
    <template v-if="category.description">
      <div :class="extendedDescription ? 'extended' : 'short'" v-html="category.description"></div>
      <a class="text-secondary-500" href="javascript:void(0)" @click="extendedDescription = !extendedDescription">{{
        extendedDescription ? 'Zobraziť menej' : 'Zobraziť viac'
      }}</a>
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
