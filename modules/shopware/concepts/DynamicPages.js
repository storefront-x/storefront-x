//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class DynamicPages extends GeneratingConcept {
  get directory() {
    return 'dynamicPages'
  }

  get template() {
    return `//@ts-check
import { defineAsyncComponent } from 'vue'
<%_ for (const [ident, {path}] of Object.entries(records)) { _%>
export const <%= ident %> = defineAsyncComponent(() => import('<%= path %>'))
<%_ } _%>
`
  }
}
