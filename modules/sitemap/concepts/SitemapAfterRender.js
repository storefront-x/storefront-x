//@ts-check

import { GeneratingConcept } from '@magexo/core'

export default class SitemapAfterRender extends GeneratingConcept {
  get directory() {
    return 'sitemap/afterRender'
  }
}
