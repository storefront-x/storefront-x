import { setHeader } from 'h3'
import useContext from '#ioc/composables/useContext'

export default () => {
  const ctx = useContext()

  return async (response: Response) => {
    const xMagentoTags = response.headers.get('X-Magento-Tags')

    if (!xMagentoTags) return

    if (!ctx._magentoTags) ctx._magentoTags = new Set()

    for (const tag of xMagentoTags.split(',')) {
      ctx._magentoTags.add(tag)
    }

    setHeader(ctx.event, 'X-Magento-Tags', [...ctx._magentoTags.values()].join(','))
  }
}
