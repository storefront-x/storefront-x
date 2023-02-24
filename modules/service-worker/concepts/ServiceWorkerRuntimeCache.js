import path from 'node:path'
import { generateSW } from 'workbox-build'
import { GeneratingConcept } from '@storefront-x/core'

export default class ServiceWorkerRuntimeCache extends GeneratingConcept {
  get directory() {
    return 'serviceWorker/runtimeCache'
  }

  get extension() {
    return 'js'
  }

  get recursive() {
    return true
  }

  getPathForFile(module, file) {
    return 'file://' + module.join(this.directory, file).replace(/\.ts$/, '').replace(/\\/g, '/')
  }

  async afterBuild() {
    const { default: runtimeCache } = await import('file://' + path.join(this.dst(), 'runtimeCache.js'))

    await generateSW({
      navigateFallback: null,
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: Object.values(runtimeCache),
      swDest: `${path.join(this.core.distDir, 'client')}/sw.js`,
    })
  }
}
