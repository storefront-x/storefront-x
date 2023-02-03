import SitemapRenderer from '@storefront-x/sitemap/SitemapRenderer.js'
import modules from '~/.sfx/sitemap'
import prefixes from '~/.sfx/sitemap/prefixes'

export default async (baseUrl: string, hostname: string) => {
  let store = null
  for (const prefix of Object.values(prefixes)) {
    store = prefix(baseUrl)
  }

  const _urls = [] as any

  for (const module of Object.values(modules)) {
    _urls.push(module(store?.storeCode ?? '', store?.name ?? ''))
  }

  const urls = (await Promise.all(_urls)).flat()

  const sitemap = new SitemapRenderer()
    .prefix(store?.prefix ?? '')
    .withUrls(urls)
    .withHostname(hostname)
    .render()

  return sitemap
}
