<template>
  <nav class="flex items-center nowrap whitespace-nowrap overflow-x-auto w-full" :aria-label="t('Breadcrumbs')">
    <ol role="list" class="flex items-center space-x-1 sm:space-x-4 list-none p-0">
      <li>
        <div>
          <RouterLink
            :to="localePath('/')"
            class="sm:px-3 px-1 py-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
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
      <li v-for="(breadcrumb, index) in props.breadcrumbs" :key="index" class="item min-w-0 whitespace-nowrap">
        <div class="flex items-center">
          <div>
            <SolidChevronRight />
          </div>

          <RouterLink
            :to="breadcrumb.link"
            class="md:ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 min-w-0 hover:underline"
          >
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
