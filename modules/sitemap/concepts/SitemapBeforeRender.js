//@ts-check

import { GeneratingConcept } from '@magexo/core'

export default class SitemapBeforeRender extends GeneratingConcept {
  get directory() {
    return 'sitemap/beforeRender'
  }
}
