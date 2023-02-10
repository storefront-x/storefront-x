import useCookies from '#ioc/composables/useCookies'

export default () => {
  const cookies = useCookies()

  return async (res: Response) => {
    const resCacheId = res.headers.get('X-Magento-Cache-Id')

    if (resCacheId) {
      const storedCacheId = cookies.get('X-Magento-Cache-Id')

      if (storedCacheId !== resCacheId) {
        cookies.set('X-Magento-Cache-Id', resCacheId, { path: '/' })
      }
    }
  }
}
