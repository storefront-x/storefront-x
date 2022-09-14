<template>
  <div class="flex flex-wrap justify-between w-full">
    <BackToTop :is-in-pagination="true" class="md:hidden flex-auto" />
    <nav
      v-if="pages.length > 1"
      class="md:border-t border-gray-200 md:px-4 flex items-center md:justify-between px-0 flex-wrap w-full flex-1"
    >
      <div class="-mt-px flex order-2 justify-center basis-auto md:flex">
        <RouterLink
          v-if="leftLastItem"
          :to="getUrlFor(1)"
          class="hover:text-white hover:font-bold hover:bg-primary-500 md:hover:bg-inherit rounded-lg md:rounded-none md:border-t-2 border-transparent md:pt-4 px-2 md:px-4 inline-flex items-center font-base md:font-medium text-black md:text-gray-500 md:hover:text-gray-700 md:hover:border-gray-300"
        >
          {{ firstPage }}
        </RouterLink>
        <span
          v-if="leftSeparator"
          class="md:border-t-2 md:pt-4 md:px-4 inline-flex items-center font-base md:font-medium border-transparent text-gray-500"
          >...</span
        >
        <RouterLink
          v-for="page in pages"
          :key="page"
          :to="getUrlFor(page)"
          :class="[
            'md:border-t-2 md:pt-4 px-2 mx-1 md:px-4 items-center font-base md:font-medium md:bg-inherit md:hover:bg-inherit md:rounded-none',
            page === currentPage
              ? 'text-white font-bold bg-primary-500 rounded-lg md:border-primary-500 md:text-primary-600'
              : 'text-black hover:text-white hover:font-bold hover:bg-primary-500 rounded-lg md:border-transparent md:text-gray-500 md:hover:text-gray-700 md:hover:border-gray-300',
            currentPage > 1 && currentPage < lastPage
              ? page < currentPage - 1 || page > currentPage + 1
                ? 'hidden md:inline-flex'
                : 'inline-flex'
              : page < currentPage - 2 || page > currentPage + 2
              ? 'hidden md:inline-flex'
              : 'inline-flex',
          ]"
        >
          {{ page }}
        </RouterLink>

        <span
          v-if="rightSeparator"
          class="md:border-t-2 md:pt-4 md:px-4 inline-flex items-center font-base md:font-medium border-transparent text-gray-500"
          >...</span
        >

        <RouterLink
          v-if="rightLastItem"
          :to="getUrlFor(lastPage)"
          class="hover:text-white hover:font-bold hover:bg-primary-500 md:hover:bg-inherit rounded-lg md:rounded-none md:border-t-2 border-transparent md:pt-4 px-2 md:px-4 inline-flex items-center font-base md:font-medium text-black md:text-gray-500 md:hover:text-gray-700 md:hover:border-gray-300"
        >
          {{ lastPage }}
        </RouterLink>
      </div>
      <div class="ml-auto md:ml-0 w-auto md:my-0 md:flex-1 flex order-1 md:basis-auto md:order-1">
        <RouterLink
          v-if="!isOnFirstPage"
          :to="getUrlFor(previousPage)"
          class="border-t-2 border-transparent md:pt-4 pr-1 inline-flex items-center font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          <SolidArrowLeft
            class="hidden md:block border border-gray-400 rounded-full p-1 md:border-0 md:rounded-none md:p-0 md:mr-3 h-8 w-8 md:h-5 md:w-5 text-gray-400"
          />
          <SolidChevronRight class="md:hidden h-8 w-8 md:h-5 md:w-5 text-black transform rotate-180" />
          <span class="hidden md:inline">
            {{ t('Previous') }}
          </span>
        </RouterLink>
      </div>

      <div class="w-auto md:flex-1 flex order-2 justify-end md:basis-auto md:order-3">
        <RouterLink
          v-if="!isOnLastPage"
          :to="getUrlFor(nextPage)"
          class="border-t-2 border-transparent md:pt-4 pl-1 inline-flex items-center font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          <span class="hidden md:inline">
            {{ t('Next') }}
          </span>
          <SolidArrowRight
            class="hidden md:block border border-gray-400 rounded-full p-1 md:border-0 md:rounded-none md:p-0 md:ml-3 h-8 w-8 md:h-5 md:w-5 text-gray-400"
          />
          <SolidChevronRight class="md:hidden h-8 w-8 md:h-5 md:w-5 text-black" />
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import RouterLink from '#ioc/components/RouterLink'
import BackToTop from '#ioc/molecules/BackToTop'
import IsPagination from '#ioc/mixins/IsPagination'
import SolidArrowLeft from '#ioc/icons/SolidArrowLeft'
import SolidArrowRight from '#ioc/icons/SolidArrowRight'
import SolidChevronRight from '#ioc/icons/SolidChevronRight'
import useI18n from '#ioc/composables/useI18n'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    BackToTop,
    RouterLink,
    SolidArrowLeft,
    SolidArrowRight,
    SolidChevronRight,
  },

  mixins: [IsPagination],

  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Previous: Předchozí
  Next: Další
  Last: Poslední
  First: První
</i18n>
