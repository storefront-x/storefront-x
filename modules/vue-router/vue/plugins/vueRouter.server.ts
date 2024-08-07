import BASE_URL from '#ioc/config/BASE_URL'
import Context from '#ioc/types/base/Context'
import type { App } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '~/.sfx/pages'

export default async (app: App, ctx: Context) => {
  const router = createRouter({
    history: createMemoryHistory(BASE_URL),
    routes,
  })

  router.onError((error: any) => {
    console.error(error.message)
  })

  ctx.$router = router

  await router.push(ctx.event.path.replace(BASE_URL, '/') ?? '/')

  await router.isReady()

  app.use(router)
}
