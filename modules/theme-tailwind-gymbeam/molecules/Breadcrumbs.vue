<template>
  <nav class="flex items-center nowrap whitespace-nowrap overflow-x-auto w-full mb-2" :aria-label="t('Breadcrumbs')">
    <ol role="list" class="flex items-center space-x-1 sm:space-x-4 list-none p-0 mb-0">
      <li>
        <div>
          <RouterLink
            :to="localePath('/')"
            class="py-1 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <span v-if="breadcrumbs.length === 0" class="ml-4 text-sm font-semibold text-[#a8a69f] hover:text-gray-700">
              {{ t('Home') }}
            </span>
            <span v-else class="text-sm font-semibold text-[#a8a69f]">
              {{ t('Home') }}
            </span>
          </RouterLink>
        </div>
      </li>
      <li v-for="(breadcrumb, index) in props.breadcrumbs" :key="index" class="item min-w-0 whitespace-nowrap">
        <div class="flex items-center">
          <div>
            <SolidChevronRight class="fill-[#a8a69f]" />
          </div>

          <RouterLink
            :to="breadcrumb.link"
            class="md:ml-4 text-sm font-semibold text-[#a8a69f] hover:text-gray-700 min-w-0 hover:underline"
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
sk-SK:
  Breadcrumbs: Drobečková navigace
  Home: Hlavná stránka
</i18n>
