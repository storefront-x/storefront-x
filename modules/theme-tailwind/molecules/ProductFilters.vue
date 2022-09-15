<template>
  <aside>
    <h2 class="sr-only">{{ 'Filters' }}</h2>

    <button
      type="button"
      class="inline-flex items-center lg:hidden"
      @click="isMobileFiltersOpen = !isMobileFiltersOpen"
    >
      <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
        <path
          d="M0 1.85156C0 1.04297 0.632812 0.375 1.44141 0.375H16.5234C17.332 0.375 18 1.04297 18 1.85156C18 2.20312 17.8594 2.51953 17.6484 2.76562L11.8125 9.97266V15C11.8125 15.6328 11.2852 16.125 10.6523 16.125C10.4062 16.125 10.1602 16.0547 9.94922 15.8789L6.71484 13.3125C6.36328 13.0312 6.1875 12.6445 6.1875 12.2227V9.97266L0.316406 2.76562C0.105469 2.51953 0 2.20312 0 1.85156ZM1.89844 2.0625L7.66406 9.12891C7.80469 9.30469 7.875 9.48047 7.875 9.65625V12.082L10.125 13.875V9.65625C10.125 9.48047 10.1602 9.30469 10.3008 9.12891L16.0664 2.0625H1.89844Z"
          fill="#FF6700"
        />
      </svg>
      <span class="font-medium text-gray-700">{{ 'Filters' }}</span>
    </button>

    <ProductFiltersMobile
      v-if="isMobileFiltersOpen"
      :aggregations="aggregations"
      @close="isMobileFiltersOpen = false"
    />

    <div class="hidden lg:block">
      <ProductFiltersDesktop :aggregations="aggregations" />
    </div>
  </aside>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import ProductFiltersDesktop from '#ioc/molecules/ProductFiltersDesktop'

export default defineComponent({
  components: {
    ProductFiltersMobile: defineAsyncComponent(() => import('#ioc/molecules/ProductFiltersMobile')),
    ProductFiltersDesktop,
  },

  props: {
    aggregations: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },

  data: () => ({
    isMobileFiltersOpen: false,
  }),
})
</script>

<i18n lang="yaml">
cs-CZ:
  Show filters: Zobrazit filtry
</i18n>
