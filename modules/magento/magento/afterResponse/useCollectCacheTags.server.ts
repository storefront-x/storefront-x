import useContext from '#ioc/composables/useContext'

export default () => {
  const ctx = useContext()

  return async (response: Response) => {
    if (ctx._magentoTagsAreSet) return

    const cacheControl = response.headers.get('Cache-Control')

    if (cacheControl?.includes('no-cache')) {
      ctx.responseHeaders['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
      delete ctx.responseHeaders['X-Magento-Tags']
      ctx._magentoTagsAreSet = true
      return
    }

    const xMagentoTags = response.headers.get('X-Magento-Tags')

    if (!xMagentoTags) return

    if (!ctx._magentoTags) ctx._magentoTags = new Set()

    for (const tag of xMagentoTags.split(',')) {
      ctx._magentoTags.add(tag)
    }

    ctx.responseHeaders['X-Magento-Tags'] = [...ctx._magentoTags.values()].join(',')
  }
}
