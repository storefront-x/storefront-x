<template>
  <nav class="flex items-center nowrap whitespace-nowrap overflow-x-auto w-full" :aria-label="t('Breadcrumbs')">
    <ol role="list" class="flex items-center list-none p-0">
      <li class="min-w-0 whitespace-nowrap">
        <div class="flex items-center">
          <RouterLink :to="localePath('/')" class="text-[12px] text-grey-555 hover:text-red-555 hover:underline">
            {{ t('Domů') }}
          </RouterLink>
        </div>
      </li>
      <li
        v-for="(breadcrumb, index) in props.breadcrumbs"
        :key="index"
        class="min-w-0 whitespace-nowrap before:content-['/'] before:px-[8px] flex before:text-[10px] before:text-grey-555"
      >
        <div class="flex items-center">
          <RouterLink :to="breadcrumb.link" class="text-[12px] text-grey-555 hover:underline">
            {{ breadcrumb.title }}
          </RouterLink>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import ToBreadcrumb from '#ioc/mappers/ToBreadcrumb'
import useLocalePath from '#ioc/composables/useLocalePath'

const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<ReturnType<typeof ToBreadcrumb>[]>,
    required: true,
    default: () => [],
  },
})
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<i18n lang="yaml">
cs-CZ:
  Breadcrumbs: Drobečková navigace
  Home: Domů
</i18n>
