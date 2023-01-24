import useCookies from '#ioc/composables/useCookies'

export default () => {
  const cookies = useCookies()

  return async (res: Response) => {
    const resCacheId = res.headers.get('X-Magento-Cache-Id')

    if (resCacheId) {
      const storedCacheId = cookies.get('magentoCacheId')

      if (storedCacheId !== resCacheId) {
        cookies.set('magentoCacheId', resCacheId)
      }
    }
  }
}
