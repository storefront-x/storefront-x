import VUE_ROUTER_SCROLL_BEHAVIOR from '#ioc/config/VUE_ROUTER_SCROLL_BEHAVIOR'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import { routes } from '/pages'

export default async (app: App, ctx: any) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: VUE_ROUTER_SCROLL_BEHAVIOR,
  })

  router.onError((error: any) => {
    console.error(error.message)
  })

  ctx.$router = router

  await router.push(window.location.pathname + window.location.search + window.location.hash)

  await router.isReady()

  // @ts-ignore
  if (!window.$state) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    router.beforeEach((to, from, next) => {
      // If the server-side rendering failed (window.$state is missing),
      // lets do full-page reload in an attempt to refetch missing server data (menu, customer, ...).
      window.location.href = to.fullPath
    })
  }

  app.use(router)
}
