import ensureArray from './array/ensureArray'
import CATALOG_FILTER_ATTRIBUTES_RANGE from '#ioc/config/CATALOG_FILTER_ATTRIBUTES_RANGE'

export default (filter: any, { except }: any = {}) => {
  const obj: any = {}

  for (const _filter of ensureArray(filter)) {
    const [key, ...values] = _filter.split(',')

    if (key === except) continue

    if (CATALOG_FILTER_ATTRIBUTES_RANGE.includes(key)) {
      // Check if range filter is used as an option filter
      if (values.length === 1 && values[0].includes('_')) {
        const [from, to] = values[0].split('_')

        obj[key] = { from, to }
      } else {
        const [from, to] = values.map(Number)

        obj[key] = {
          ...(!isNaN(from) ? { from } : {}),
          ...(!isNaN(to) ? { to } : {}),
        }
      }
    } else {
      obj[key] = { in: String(values).split(',') }
    }
  }

  return obj
}
