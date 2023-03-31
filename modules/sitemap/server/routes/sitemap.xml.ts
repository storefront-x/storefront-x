import { eventHandler, getRequestURL, setResponseHeader } from 'h3'
import sitemap from '@storefront-x/sitemap/sitemap.js'

export default eventHandler(async (event) => {
  const finalSitemap = await sitemap({
    path: getRequestURL(event).pathname,
    host: getRequestURL(event).hostname,
  })

  setResponseHeader(event, 'Content-Type', 'text/xml')

  return finalSitemap
})
