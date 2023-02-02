import sitemap from '@storefront-x/sitemap/sitemap.js'

export default async (req: any, res: any) => {
  const finalSitemap = await sitemap(req.baseUrl, req.hostname)

  res.type('text/xml')
  res.end(finalSitemap)
}
