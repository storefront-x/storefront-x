import type { App } from 'vue'
import { createRouter } from '../../Router'
import { layouts, routes } from '~/.sfx/pages'

export default async (app: App, ctx: any) => {
  const router = createRouter({ routes, layouts })

  ctx.$router = router

  await router.push(window.location.pathname + window.location.search + window.location.hash)

  app.use(router)
}
