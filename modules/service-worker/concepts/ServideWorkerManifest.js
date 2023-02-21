import { GeneratingConcept } from '@storefront-x/core'

export default class ServiceWorkerManifest extends GeneratingConcept {
  get directory() {
    return 'serviceWorker/manifest'
  }
}
