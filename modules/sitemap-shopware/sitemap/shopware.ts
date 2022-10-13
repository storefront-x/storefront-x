import SHOPWARE_URL from '#ioc/config/SHOPWARE_URL'
import SHOPWARE_API_PREFIX from '#ioc/config/SHOPWARE_API_PREFIX'
import SHOPWARE_ACCESS_KEY from '#ioc/config/SHOPWARE_ACCESS_KEY'
import pkgGzip from 'node-gzip'
const { ungzip } = pkgGzip

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (store?: any) => {
  const sitemap = await fetchSitemap()

  const urls = []

  for (const match of sitemap.matchAll(/<loc>https?:\/\/.+?\/(.*?)<\/loc>/g)) {
    urls.push({ loc: '' + match[1] })
  }

  return urls
}

const fetchSitemap = async () => {
  const sitemapResponse = await fetch(SHOPWARE_URL + SHOPWARE_API_PREFIX + '/sitemap', {
    headers: {
      'sw-access-key': SHOPWARE_ACCESS_KEY,
    },
  })

  const sitemapFile = await sitemapResponse.json()
  const filePath = sitemapFile[0].filename

  const response = await fetch(filePath)
  const body = await response.arrayBuffer()

  const sitemap = (await ungzip(body)).toString()

  return sitemap
}
