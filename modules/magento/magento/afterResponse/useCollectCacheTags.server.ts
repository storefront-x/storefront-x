import { setHeader } from 'h3'
import useContext from '#ioc/composables/useContext'

export default () => {
  const ctx = useContext()

  return async (response: Response) => {
    if (ctx._magentoTagsAreSet) return

    const cacheControl = response.headers.get('Cache-Control')

    if (cacheControl?.includes('no-cache')) {
      setHeader(ctx.event, 'Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
      setHeader(ctx.event, 'X-Magento-Tags', '')
      ctx._magentoTagsAreSet = true
      return
    }

    const xMagentoTags = response.headers.get('X-Magento-Tags')

    if (!xMagentoTags) return

    if (!ctx._magentoTags) ctx._magentoTags = new Set()

    for (const tag of xMagentoTags.split(',')) {
      ctx._magentoTags.add(tag)
    }

    setHeader(ctx.event, 'X-Magento-Tags', [...ctx._magentoTags.values()].join(','))
  }
}
