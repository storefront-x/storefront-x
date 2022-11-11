import type { App } from 'vue'
import { createRouter } from '../../Router'
import { routes } from '~/.sfx/pages'

export default async (app: App, ctx: any) => {
  const router = createRouter({
    routes,
  })
  await router.push(ctx.req.url)
  app.use(router)
}
