import CATALOG_FILTER_ATTRIBUTES_HIDDEN from '#ioc/config/magento/CATALOG_FILTER_ATTRIBUTES_HIDDEN'
import field from '#ioc/graphql/field'
import Aggregation from '#ioc/graphql/fragments/Aggregation'

export default (filters: any, search: any) => {
  const fields: any = {}

  for (const key of Object.keys(filters)) {
    if (CATALOG_FILTER_ATTRIBUTES_HIDDEN.includes(key)) continue

    const filter = { ...filters }

    delete filter[key]

    fields[`aggregations_${key}` as keyof typeof fields] = field('products')
      .args({ filter, search })
      .fields({
        aggregations: field({
          ...Aggregation(),
        }),
      })
  }

  return fields
}
