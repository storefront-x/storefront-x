<template>
  <div class="space-y-2 pt-4 mb-4">
    <Button
      v-if="areAnyFiltersSelected"
      color="primary"
      class="w-full bg-primary-500 rounded-none w-auto"
      @click="removeAllFilters"
    >
      {{ t('Remove all filters') }}
    </Button>

    <div v-for="aggregation in filteredAggregations" :key="aggregation.attributeCode" class="block">
      <fieldset class="flex border-b border-primary-500 pb-2 w-full justify-between">
        <div>
          <legend class="font-bold uppercase text-primary-500 font-sm block w-[150px]">
            {{ t(aggregation.label) }}
          </legend>
        </div>

        <div class="basis-[65%]">
          <div class="w-full">
            <div v-for="option in aggregation.options" :key="option.value" class="filter-item inline-block pr-2 pb-2">
              <input
                :id="'da' + aggregation.attributeCode + 'o' + option.value"
                :value="isFilterSelected(aggregation.attributeCode, option.value)"
                :checked="isFilterSelected(aggregation.attributeCode, option.value)"
                type="radio"
                class="h-4 w-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500 hidden"
                data-cy="filter-option"
                @input="onInput($event, aggregation.attributeCode, option.value)"
              />
              <label
                :for="'da' + aggregation.attributeCode + 'o' + option.value"
                class="text-white cursor-pointer text-sm p-1 bg-primary-500 transition ease-in-out delay-100 hover:bg-secondary-500"
              >
                {{ option.label }}
                <span v-if="option.hasOwnProperty('count')" class="text-white text-sm">({{ option.count }})</span>
              </label>
            </div>
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

    aggregationsSlices() {
      return this.filteredAggregations.slice(0, 9)
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

.filter-item:nth-child(n + 11) {
  @apply hidden;
}
</style>

<i18n lang="yaml">
cs-CZ:
  Price: Cena
  Remove all filters: Zrušit filtry
sk-SK:
  Price: Cena
  Remove all filters: Zrušit filtry
</i18n>
