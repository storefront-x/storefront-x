import type { App } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '~/.sfx/pages'

export default async (app: App, ctx: any) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  router.onError((error: any) => {
    console.error(error.message)
  })

  ctx.$router = router

  await router.push(ctx.req.url)

  await router.isReady()

  app.use(router)
}
