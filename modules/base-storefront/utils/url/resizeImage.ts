import CACHE_ID from '#ioc/config/CACHE_ID'
import hashCode from '#ioc/utils/string/hashCode'
import objectToQuery from '#ioc/utils/url/objectToQuery'

export default (opts: any) => {
  const query = objectToQuery({
    ...opts,
    c: CACHE_ID,
  })

  const hash = hashCode(query)

  const format = opts.format || 'jpeg'

  return `/_i/${hash}.${format}?${query}`
}
