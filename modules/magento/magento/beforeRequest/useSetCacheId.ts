import useCookies from '#ioc/composables/useCookies'

export default () => {
  const cookies = useCookies()

  return async (req: Request) => {
    const storedCacheId = cookies.get('magentoCacheId')

    if (storedCacheId) {
      req.headers.set('X-Magento-Cache-Id', storedCacheId)
    }
  }
}
