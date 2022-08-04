//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class ShopwareDynamicPages extends GeneratingConcept {
  get directory() {
    return 'shopware/dynamicPages'
  }

  get template() {
    return `
import { defineAsyncComponent } from 'vue'
export default {
<%_ for (const [ident, {path}] of Object.entries(records)) { _%>
  '<%= ident %>': defineAsyncComponent(() => import('<%= path %>')),
<%_ } _%>
}
`
  }
}
