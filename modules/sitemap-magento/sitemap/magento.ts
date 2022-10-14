import template from 'lodash/template'
import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import SITEMAP_URL_TEMPLATE from '#ioc/config/SITEMAP_URL_TEMPLATE'

const compiled = template(SITEMAP_URL_TEMPLATE)

export default async ({ store }: any) => {
  const sitemap = await fetchSitemap(store.magentoStore)

  const urls = []

  for (const match of sitemap.matchAll(/<loc>https?:\/\/.+?\/(.*?)<\/loc>/g)) {
    urls.push({ loc: '/' + match[1] })
  }

  return urls
}

const fetchSitemap = async (storeCode: string) => {
  const response = await fetch(MAGENTO_URL + compiled({ storeCode }))

  const text = await response.text()

  return text
}
