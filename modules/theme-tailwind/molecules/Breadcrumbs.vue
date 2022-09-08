<template>
  <nav class="flex" :aria-label="t('Breadcrumbs')">
    <ol role="list" class="flex items-center space-x-4 list-none p-0">
      <li>
        <div>
          <RouterLink :to="localePath('/')" class="p-4 flex items-center text-gray-500 hover:text-gray-500">
            <SolidHome />
            <span v-if="breadcrumbs.length === 0" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
              {{ t('Home') }}
            </span>
            <span v-else class="sr-only">
              {{ t('Home') }}
            </span>
          </RouterLink>
        </div>
      </li>

      <li v-for="(breadcrumb, i) in breadcrumbs" :key="i">
        <div class="flex items-center">
          <SolidChevronRight />
          <RouterLink :to="breadcrumb.link" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
            {{ breadcrumb.title }}
          </RouterLink>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import SolidHome from '#ioc/icons/SolidHome'
import SolidChevronRight from '#ioc/icons/SolidChevronRight'
import useI18n from '#ioc/composables/useI18n'
import ToBreadcrumb from '#ioc/mappers/ToBreadcrumb'
import useLocalePath from '#ioc/composables/useLocalePath'

defineProps({
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
