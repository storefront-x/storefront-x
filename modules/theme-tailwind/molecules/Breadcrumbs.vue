<template>
  <nav class="flex" :aria-label="t('Breadcrumbs')">
    <ol role="list" class="flex items-center space-x-4 list-none p-0">
      <li>
        <div>
          <RouterLink :to="localePath('/')" class="p-4 flex items-center text-gray-500 hover:text-gray-700">
            <SolidHome />
            <span
              v-if="breadcrumbs.length === 0"
              class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              :class="{ 'sr-only': clippedBreadcrumbs.length > 0 }"
            >
              {{ t('Home') }}
            </span>
            <span v-else class="sr-only">
              {{ t('Home') }}
            </span>
          </RouterLink>
        </div>
      </li>

      <li v-if="showDotsInsteadOfBreadcrumbs" class="item my-1 md:hidden">
        <div class="flex items-center">
          <SolidChevronRight class="text-gray-500" />
          <span
            class="ml-1 md:ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 inline cursor-pointer hover:bg-gray-100 px-3 rounded-md"
            @click="shortenedCrumbsOnMobile.value = false"
          >
            ...
          </span>
        </div>
      </li>

      <li
        v-for="(breadcrumb, index) in clippedBreadcrumbs"
        :key="index"
        class="item my-1"
        :class="restBreadcrumbsClasses(index)"
      >
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
import { computed, ref } from 'vue'

const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<ReturnType<typeof ToBreadcrumb>[]>,
    required: true,
    default: () => [],
  },
})
const shortenedCrumbsOnMobile = ref(true)
const { t } = useI18n()
const localePath = useLocalePath()

const clippedBreadcrumbs = computed(() => {
  return props.breadcrumbs.slice(1, -1)
})

const showDotsInsteadOfBreadcrumbs = computed(() => {
  return shortenedCrumbsOnMobile.value && clippedBreadcrumbs.value.length > 1
})

const restBreadcrumbsClasses = (index: number) => {
  return {
    'hidden': showDotsInsteadOfBreadcrumbs.value && index < clippedBreadcrumbs.value.length - 1,
    'md:block': true,
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Breadcrumbs: Drobečková navigace
  Home: Domů
</i18n>
