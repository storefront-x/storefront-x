import { GeneratingConcept } from '@storefront-x/core'

export default class ServiceWorkerRuntimeCache extends GeneratingConcept {
  get extension() {
    return 'js'
  }

  getPathForFile(module, file) {
    return 'file://' + module.join(this.directory, file).replace(/\.ts$/, '').replace(/\\/g, '/')
  }

  get directory() {
    return 'serviceWorker/runtimeCache'
  }
}
