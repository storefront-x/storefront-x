//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class SitemapPrefixes extends GeneratingConcept {
  get directory() {
    return 'sitemap/prefixes'
  }
}
