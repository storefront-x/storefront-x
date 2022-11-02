import VUE_ROUTER_SCROLL_BEHAVIOR from '#ioc/config/VUE_ROUTER_SCROLL_BEHAVIOR'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '~/.sfx/pages'
import useCustomerStore from '#ioc/stores/useCustomerStore'
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
  const store = useCustomerStore()
  router.beforeEach((to, from, next) => {
    console.log(to.name)
    console.log(store.customer)
    if (to.name !== 'sign-in' && !store.customer) next({ name: 'sign-in' })
    else next()
    console.log('next')
  })
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
