<template>
  <Link :to="localePath(category.urlPath)" :color="color" :class="classes">
    {{ category.name }}
  </Link>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import useCategory from '#ioc/composables/useCategory'
import useToCategory from '#ioc/mappers/useToCategory'
import { computed, PropType } from 'vue'
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<ReturnType<typeof useToCategory>>>,
    required: true,
  },
  classes: {
    type: String,
    default: '',
  },
  color: {
    type: String as PropType<'primary' | 'gray'>,
    default: undefined,
  },
})

const category = useCategory(computed(() => props.category))
</script>
