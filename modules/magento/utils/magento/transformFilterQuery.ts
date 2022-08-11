import ensureArray from '#ioc/utils/array/ensureArray'

export default (filter: any, { except }: any = {}) => {
  const obj: any = {}

  for (const _filter of ensureArray(filter)) {
    const [key, ...values] = _filter.split(',')

    if (key === except) continue

    obj[key] = { in: String(values).split(',') }
  }

  return obj
}
