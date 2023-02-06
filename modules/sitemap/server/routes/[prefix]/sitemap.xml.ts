import { Request, Response } from 'express'
import sitemap from '@storefront-x/sitemap/sitemap.js'

export default async (req: Request, res: Response) => {
  const finalSitemap = await sitemap({
    path: req.baseUrl,
    host: req.hostname,
  })

  res.type('text/xml').end(finalSitemap)
}
