//@ts-check

import { GeneratingConcept } from '@storefront-x/core'

export default class ServerMiddleware extends GeneratingConcept {
  get directory() {
    return 'server/middleware'
  }

  get template() {
    return `// @ts-nocheck
<% if (Object.keys(records).length === 0) { %>
export {}
<% } else { %>
<%_ for (const [ident, {path}] of Object.entries(records)) { _%>
export ${this.exportAll ? '* as <%= ident %>' : '{ default as <%= ident %> }'} from '<%= path %>'
<%_ } _%>
<% } %>
`
  }
}
