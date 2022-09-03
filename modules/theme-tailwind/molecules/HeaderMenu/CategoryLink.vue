<template>
  <Link :to="localePath(category.urlPath)" :color="color" :class="classes">
    {{ category.name }}
    <slot />
  </Link>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import useCategory from '#ioc/composables/useCategory'
import ToCategory from '#ioc/mappers/ToCategory'
import { computed, PropType } from 'vue'
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof ToCategory>>,
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
