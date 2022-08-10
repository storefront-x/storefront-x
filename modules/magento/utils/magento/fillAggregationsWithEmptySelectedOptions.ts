import isArray from '#ioc/utils/isArray'

export default (aggregations: any, rest: any, filters: any) => {
  for (const [key, filter] of Object.entries(filters) as any[]) {
    const byKey = (aggregation: any) => aggregation.attribute_code === key

    const getOriginalAggregation = () => {
      const originalAggregation = aggregations.find(byKey)

      if (originalAggregation) return originalAggregation

      const newAggregation = { ...rest[`aggregations_${key}`].aggregations.find(byKey) }

      aggregations.push(newAggregation)

      return newAggregation
    }

    if (!isArray(filter.in)) continue

    const originalAggregation = getOriginalAggregation()

    const presentValues = originalAggregation.options.map((option: any) => option.value)

    const missingValues = filter.in.filter((value: any) => !presentValues.includes(value))

    const allOptions = []

    for (const [otherKey, otherAggregations] of Object.entries(rest) as any[]) {
      if (!otherKey.startsWith('aggregations_')) continue
      if (otherKey === `aggregations_${key}`) continue

      allOptions.push(...(otherAggregations.aggregations.find(byKey)?.options ?? []))
    }

    for (const missingValue of missingValues) {
      const option = allOptions.find((option) => option.value === missingValue)

      if (!option) continue

      originalAggregation.options.push({ ...option, count: 0 })
    }
  }
}
