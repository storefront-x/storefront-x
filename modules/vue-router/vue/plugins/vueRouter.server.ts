import type { App } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '~/.sfx/pages'
import useCustomerStore from '#ioc/stores/useCustomerStore'

export default async (app: App, ctx: any) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  router.onError((error: any) => {
    console.error(error.message)
  })

  ctx.$router = router

  router.beforeEach((to, from, next) => {
    const store = useCustomerStore()
    console.log(to.name)
    console.log(store.customer)
    if (to.name !== 'sign-in' && !store.customer) next({ name: 'sign-in' })
    else next()
    console.log('next')
  })

  await router.push(ctx.req.url)

  await router.isReady()

  app.use(router)
}
