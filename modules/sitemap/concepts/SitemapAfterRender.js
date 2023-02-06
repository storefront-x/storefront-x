//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class SitemapAfterRender extends GeneratingConcept {
  get directory() {
    return 'sitemap/afterRender'
  }
}
