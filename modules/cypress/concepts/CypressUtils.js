//@ts-check
import path from 'node:path'
import { IocConcept } from '@storefront-x/core'

export default class CypressUtils extends IocConcept {
  get directory() {
    return 'cypress/utils'
  }

  dst() {
    return path.join(this.core.rootDir, this.directory)
  }
}
