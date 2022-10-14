import SitemapRenderer from '../../SitemapRenderer.js'
import modules from '~/.sfx/sitemap'
import isEmpty from '#ioc/utils/isEmpty'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'

export default async (req: any, res: any) => {
  const store = getStoreFromUrl(req.hostname, req.url, VUE_I18N_LOCALES)

  const _urls = []

  for (const module of Object.values(modules)) {
    _urls.push(module({ store }))
  }

  const urls = (await Promise.all(_urls)).flat()

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
