<template>
  <div class="space-y-7">
    <Button v-if="areAnyFiltersSelected" color="primary" class="w-full" @click="removeAllFilters">
      {{ t('Remove all filters') }}
    </Button>

    <div v-for="aggregation in filteredAggregations" :key="aggregation.attributeCode">
      <fieldset>
        <legend class="block font-medium text-gray-900">
          {{ t(aggregation.label) }}
        </legend>
        <div
          class="pt-6 space-y-3 overflow-y-auto pl-2 -ml-2"
          :class="{
            'max-h-[300px]': !isCollapsed(aggregation.attributeCode),
          }"
        >
          <div v-for="option in aggregation.options" :key="option.value" class="flex items-center">
            <input
              :id="'da' + aggregation.attributeCode + 'o' + option.value"
              :value="isFilterSelected(aggregation.attributeCode, option.value)"
              :checked="isFilterSelected(aggregation.attributeCode, option.value)"
              type="checkbox"
              class="h-4 w-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
              data-cy="filter-option"
              @input="onInput($event, aggregation.attributeCode, option.value)"
            />
            <label :for="'da' + aggregation.attributeCode + 'o' + option.value" class="ml-3 text-gray-600">
              {{ option.label }}
              <span v-if="option.hasOwnProperty('count')" class="text-gray-400 text-sm">({{ option.count }})</span>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
import Button from '#ioc/atoms/Button'
import UsesFilters from '#ioc/mixins/UsesFilters'
import useI18n from '#ioc/composables/useI18n'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Button,
  },

  mixins: [UsesFilters],

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
    isOpen: {},
    collapsed: {},
  }),

  computed: {
    filteredAggregations() {
      return this.aggregations.filter((aggregation) => {
        return aggregation.options.length > 0
      })
    },

    areAnyFiltersSelected() {
      return Object.keys(this.filters).length > 0
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

    isCollapsed(code) {
      return !!this.collapsed[code]
    },
  },
})
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
  margin-top: 10px;
  padding-top: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-gray-100;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-gray-300;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500;
}
</style>

<i18n lang="yaml">
cs-CZ:
  Price: Cena
  Remove all filters: Zrušit filtry
</i18n>
