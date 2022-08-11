import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import isNullish from '#ioc/utils/isNullish'
import debounce from '#ioc/utils/debounce'
import isDeepEqual from '#ioc/utils/isDeepEqual'
import ensureArray from '#ioc/utils/array/ensureArray'

export default {
  data: (vm) => {
    const innerFilters = {}

    for (const filter of ensureArray(vm.$route.query.filter)) {
      const [key, ...values] = filter.split(',')

      innerFilters[key] = values
    }

    return {
      innerFilters,
    }
  },

  computed: {
    filters() {
      const filters = {}

      for (const filter of ensureArray(this.$route.query.filter)) {
        const [key, ...values] = filter.split(',')

        filters[key] = values
      }

      return filters
    },

    hasFiltersApplied() {
      return isNonEmptyObject(this.filters)
    },

    totalFilterCount() {
      return Object.entries(this.filters).filter(([, values]) => values && values.length > 0).length
    },
  },

  watch: {
    innerFilters: debounce(
      function (innerFilters, oldInnerFilters) {
        if (isDeepEqual(innerFilters, oldInnerFilters)) return

        const _filters = []

        for (const [key, values] of Object.entries(innerFilters)) {
          if (values.length === 0) continue

          _filters.push(`${key},${values.join(',')}`)
        }

        this.$router.push({
          query: {
            ...this.$route.query,
            filter: _filters,
            page: undefined,
            pages: undefined,
          },
          params: {
            savePosition: true,
          },
        })
      },
      1000,
      {
        leading: true,
        trailing: true,
      },
    ),
  },

  methods: {
    addFilter(key, value) {
      if (this.isFilterSelected(key, value)) return

      const filters = { ...this.innerFilters }

      filters[key] = [...(filters[key] ?? []), value]

      this.innerFilters = filters
    },

    removeFilter(key, value) {
      if (!this.isFilterSelected(key, value)) return

      const filters = { ...this.innerFilters }

      if (isNullish(value)) {
        delete filters[key]
      } else {
        filters[key] = filters[key].filter((_value) => _value !== value)
      }

      this.innerFilters = filters
    },

    removeAllFilters() {
      this.innerFilters = {}
    },

    isFilterSelected(key, value) {
      if (isNullish(value)) return !isNullish(this.filters[key])
      return ensureArray(this.filters[key]).includes(value)
    },
  },
}
