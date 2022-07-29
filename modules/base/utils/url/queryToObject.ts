import isNullish from '#ioc/utils/isNullish'

export default (query: any) => {
  if (isNullish(query)) return ''

  return query
    .split('&')
    .map((part: string) => part.split('='))
    .reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {})
}
