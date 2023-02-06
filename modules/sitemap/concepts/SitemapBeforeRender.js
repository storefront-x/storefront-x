//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class SitemapBeforeRender extends GeneratingConcept {
  get directory() {
    return 'sitemap/beforeRender'
  }
}
