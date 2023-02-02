import SitemapRenderer from '@storefront-x/sitemap/SitemapRenderer.js'
import modules from '~/.sfx/sitemap'
import locales from '~/.sfx/sitemap/locales'

export default async (baseUrl: string, hostname: string) => {
  let store = null
  for (const locale of Object.values(locales)) {
    store = locale(baseUrl)
  }

  const _urls = [] as any

  for (const module of Object.values(modules)) {
    _urls.push(module({ store }))
  }

  const urls = (await Promise.all(_urls)).flat()

  const sitemap = new SitemapRenderer().withStore(store).withUrls(urls).withHostname(hostname).render()

  return sitemap
}
