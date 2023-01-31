import SitemapRenderer from '../../SitemapRenderer.js'
import modules from '~/.sfx/sitemap'
import isEmpty from '#ioc/utils/isEmpty'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import { routes } from '~/.sfx/pages'

export default async (req: any, res: any) => {
  const store = getStoreFromUrl(req.hostname, req.url, VUE_I18N_LOCALES)
  const staticPages = getStaticPages()

  const _urls = [] as any

  for (const module of Object.values(modules)) {
    _urls.push(module({ store }))
  }

  const mergedUrls = _urls.concat(staticPages)

  const urls = (await Promise.all(mergedUrls)).flat()

  const sitemap = new SitemapRenderer().withStore(store).withUrls(urls).withHostname(req.hostname).render()

  res.type('text/xml')
  res.end(sitemap)
}

const getStoreFromUrl = (hostname: string, url: string, config: any) => {
  if (isEmpty(config)) return null

  const codes = config.map((configItem: any) => configItem.name)

  return config[getIndexOfCodeFromUrl(url.replace(/^\//, ''), codes)]
}

const getIndexOfCodeFromUrl = (url: string, matches: any) => {
  for (const [i, match] of matches.entries()) {
    if (url.startsWith(match)) return i
  }

  return 0
}

const getStaticPages = () => {
  const newRoutes = routes.slice(1, -1)

  const urls = []

  for (const route of newRoutes) {
    urls.push({ loc: route.readablePath })
  }

  return urls
}
