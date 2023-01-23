<template>
  <Link :to="localePath(category.urlPath)" color="black" class="font-normal hover:underline">
    {{ category.name }}
  </Link>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import useCategory from '#ioc/composables/useCategory'
import ToCategory from '#ioc/mappers/ToCategory'
import { PropType, computed } from 'vue'
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof ToCategory>>,
    required: true,
  },
})

const category = useCategory(computed(() => props.category))
</script>
