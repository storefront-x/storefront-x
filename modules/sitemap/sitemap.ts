import Options from '#ioc/types/sitemap/Options'
import SitemapRenderer from '@storefront-x/sitemap/SitemapRenderer.js'
import modules from '~/.sfx/sitemap'
import transformators from '~/.sfx/sitemap/transformators'

export default async (options: Options) => {
  for (const prefix of Object.values(transformators)) {
    await prefix(options)
  }

  const _urls = [] as any

  for (const module of Object.values(modules)) {
    _urls.push(module(options))
  }

  const urls = (await Promise.all(_urls)).flat()

  const sitemap = new SitemapRenderer()
    .prefix(options.prefix ?? '')
    .withUrls(urls)
    .withHostname(options.host)
    .render()

  return sitemap
}
