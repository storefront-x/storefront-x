//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class MagentoDynamicPages extends GeneratingConcept {
  get directory() {
    return 'magento/dynamicPages'
  }

  get template() {
    return `// generated by Storefront X
import { defineAsyncComponent } from 'vue'

export default {
<%_ for (const [ident, record] of Object.entries(records)) { _%>
  '<%= ident %>': defineAsyncComponent(() => import('<%= record.path %>')),
<%_ } _%>
}
`
  }
}
