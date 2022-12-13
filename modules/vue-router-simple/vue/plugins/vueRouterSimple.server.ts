import type { App } from 'vue'
import { createRouter } from '../../Router'
import { layouts, routes } from '~/.sfx/pages'

export default async (app: App, ctx: any) => {
  const router = createRouter({ routes, layouts })
  await router.push(ctx.req.url)

  app.use(router)
}
