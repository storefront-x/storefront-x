import type { App } from 'vue'
import { createHead } from '@vueuse/head'

export default async (app: App, ctx?: any) => {
  const head = createHead()

  ctx.$head = head

  app.use(head)
}
