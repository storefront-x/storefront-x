<template>
  <Link :to="localePath(category.urlPath)" :color="color" :class="classes" class="hover:no-underline group">
    <span class="font-bold text-primary-500 text-[18px] group-hover:text-primary-555">{{ category.name }}</span>
    <span v-if="category.id === 104" class="block font-normal text-xs text-black">{{
      t('Parking, Transport, Check-in')
    }}</span>
    <span v-if="category.id === 105" class="block font-normal text-xs text-black">{{
      t('Transport from Airport, Accommodations')
    }}</span>
    <slot />
  </Link>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import useCategory from '#ioc/composables/useCategory'
import ToCategory from '#ioc/mappers/ToCategory'
import { computed, PropType } from 'vue'
import useLocalePath from '#ioc/composables/useLocalePath'
import useI18n from '#ioc/composables/useI18n'

const localePath = useLocalePath()
const { t } = useI18n()

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
