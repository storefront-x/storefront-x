export default (aggregations: any, rest: any, filters: any) => {
  for (const key in filters) {
    const byKey = (aggregation: any) => aggregation.attribute_code === key

    const relatedAggregation = rest[`aggregations_${key}`]?.aggregations.find(byKey)

    if (!relatedAggregation) continue

    const originalAggregation = aggregations.find(byKey)

    if (!originalAggregation) continue

    originalAggregation.options = relatedAggregation.options
  }
}
