import type { App } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '~/.sfx/pages'
import { default as beforeEachGuards } from '~/.sfx/global-before-each'

export default async (app: App, ctx: any) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  router.onError((error: any) => {
    console.error(error.message)
  })

  ctx.$router = router

  for (const beforeEachGuard of Object.values(beforeEachGuards)) {
    router.beforeEach((to) => beforeEachGuard(to, ctx))
  }

  await router.push(ctx.req.url)

  await router.isReady()

  app.use(router)
}
