import { eventHandler, getRequestURL, setResponseHeader } from 'h3'
import sitemap from '@storefront-x/sitemap/sitemap.js'

export default eventHandler(async (event) => {
  const requestUrl = getRequestURL(event)

  const finalSitemap = await sitemap({
    path: requestUrl.pathname,
    host: requestUrl.hostname,
  })

  setResponseHeader(event, 'Content-Type', 'text/xml')

  return finalSitemap
})
