import Options from '#ioc/types/sitemap/Options'
import SitemapRenderer from '@storefront-x/sitemap/SitemapRenderer.js'
import modules from '~/.sfx/sitemap'
import beforeRender from '~/.sfx/sitemap/beforeRender'
import afterRender from '~/.sfx/sitemap/afterRender'

export default async (options: Options) => {
  for (const before of Object.values(beforeRender)) {
    before(options)
  }

  const _urls = [] as any

  for (const module of Object.values(modules)) {
    _urls.push(module(options))
  }

  const urls = (await Promise.all(_urls)).flat()

  let sitemap = new SitemapRenderer()
    .prefix(options.prefix ?? '')
    .withUrls(urls)
    .withHostname(options.host)
    .render()

  for (const after of Object.values(afterRender)) {
    sitemap = after(options, sitemap)
  }

  return sitemap
}
