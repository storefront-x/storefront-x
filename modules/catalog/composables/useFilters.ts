import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import isNullish from '#ioc/utils/isNullish'
import debounce from '#ioc/utils/debounce'
import isDeepEqual from '#ioc/utils/isDeepEqual'
import ensureArray from '#ioc/utils/array/ensureArray'
import { watch, reactive, computed } from 'vue'
import useRoute from '#ioc/composables/useRoute'
import useRouter from '#ioc/composables/useRouter'

export default () => {
  const route = useRoute()
  const router = useRouter()

  const setupInnerFilers = () => {
    const innerFilters = {} as any
    for (const filter of ensureArray(route.query.filter)) {
      const [key, ...values] = filter.split(',')

      innerFilters[key] = values
    }

    return innerFilters
  }

  const _options = reactive({ innerFilters: setupInnerFilers() })

  const filters = computed(() => {
    const filters = {} as any

    for (const filter of ensureArray(route.query.filter)) {
      const [key, ...values] = filter.split(',')

      filters[key] = values
    }

    return filters
  })

  const hasFiltersApplied = computed(() => {
    return isNonEmptyObject(filters.value)
  })

  const totalFilterCount = computed(() => {
    return Object.entries(filters.value).filter(([, values]) => values && values.length > 0).length
  })
  watch(
    () => _options.innerFilters,
    debounce(
      (innerFilters, oldInnerFilters) => {
        if (isDeepEqual(innerFilters, oldInnerFilters)) return

        const _filters = []

        for (const [key, values] of Object.entries(innerFilters)) {
          if (values.length === 0) continue

          _filters.push(`${key},${values.join(',')}`)
        }

        router.push({
          query: {
            ...route.query,
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
    { deep: true },
  )

  const addFilter = (key: string, value: string) => {
    if (isFilterSelected(key, value)) return

    const filters = { ..._options.innerFilters }

    filters[key] = [...(filters[key] ?? []), value]

    _options.innerFilters = filters
  }

  const removeFilter = (key: string, value: string) => {
    if (!isFilterSelected(key, value)) return

    const filters = { ..._options.innerFilters }

    if (isNullish(value)) {
      delete filters[key]
    } else {
      filters[key] = filters[key].filter((_value: string) => _value !== value)
    }

    _options.innerFilters = filters
  }

  const removeAllFilters = () => {
    _options.innerFilters = {}
  }

  const isFilterSelected = (key: string, value: string) => {
    if (isNullish(value)) return !isNullish(filters.value[key])
    return ensureArray(filters.value[key]).includes(value)
  }

  return { filters, hasFiltersApplied, totalFilterCount, addFilter, removeFilter, removeAllFilters, isFilterSelected }
}
