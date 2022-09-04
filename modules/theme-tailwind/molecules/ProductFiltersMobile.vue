<template>
  <Drawer from="right" :title="t('Filters')" @close="$emit('close')">
    <form class="mt-4">
      <div
        v-for="aggregation in filteredAggregations"
        :key="aggregation.attributeCode"
        class="border-t border-gray-200 pt-4 pb-4"
      >
        <fieldset>
          <legend class="w-full px-2">
            <button
              type="button"
              class="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500"
              @click="isOpen[aggregation.attributeCode] = !isOpen[aggregation.attributeCode]"
            >
              <span class="font-medium text-gray-900">
                {{ t(aggregation.label) }}
                <span v-if="getCountFilters(aggregation) > 0"> ( {{ getCountFilters(aggregation) }} ) </span>
              </span>
              <span class="ml-6 h-7 flex items-center">
                <svg
                  class="h-5 w-5 transform"
                  :class="isOpen[aggregation.attributeCode] ? '-rotate-180' : 'rotate-0'"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </legend>
          <div v-if="isOpen[aggregation.attributeCode]" class="pt-4 pb-2 px-4">
            <div class="space-y-6">
              <div v-for="option in aggregation.options" :key="option.value" class="flex items-center">
                <input
                  :id="'ma' + aggregation.attributeCode + 'o' + option.value"
                  :value="isFilterSelected(aggregation.attributeCode, option.value)"
                  :checked="isFilterSelected(aggregation.attributeCode, option.value)"
                  type="checkbox"
                  class="h-4 w-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                  @input="onInput($event, aggregation.attributeCode, option.value)"
                />
                <label :for="'ma' + aggregation.attributeCode + 'o' + option.value" class="ml-3 text-gray-500">
                  {{ option.label }} <span class="text-gray-400 text-sm">({{ option.count }})</span>
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="flex justify-between px-2 gap-2">
        <FilterButton color="primary" class="w-full" @click.prevent="$emit('close')">
          {{ t('Apply filters') }}
        </FilterButton>
        <FilterButton color="primary" class="w-full" @click.prevent="removeFilters">
          {{ t('Remove all filters') }}
        </FilterButton>
      </div>
    </form>
  </Drawer>
</template>

<script>
import UsesFilters from '#ioc/mixins/UsesFilters'
import Drawer from '#ioc/atoms/Drawer'
import FilterButton from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Drawer,
    FilterButton,
  },

  mixins: [UsesFilters],

  props: {
    aggregations: {
      type: Array,
      default: () => [],
    },
  },

  emits: ['close'],

  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },

  data: () => ({
    isOpen: {},
  }),

  computed: {
    filteredAggregations() {
      return this.aggregations.filter((aggregation) => {
        return aggregation.options.length > 0
      })
    },
  },

  methods: {
    onInput(e, key, value) {
      const selected = e.target.value === 'true'

      if (!selected) {
        this.addFilter(key, value)
      } else {
        this.removeFilter(key, value)
      }
    },

    async removeFilters() {
      this.removeAllFilters()
      await this.$nextTick()
      this.$emit('close')
    },
    getCountFilters(filter) {
      if (this.filters[filter.attributeCode] !== undefined) {
        return this.filters[filter.attributeCode].length
      } else {
        return 0
      }
    },
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Filters: Filtry
  Price: Cena
  Apply filters: Použít filtry
  Remove all filters: Zrušit filtry
</i18n>
