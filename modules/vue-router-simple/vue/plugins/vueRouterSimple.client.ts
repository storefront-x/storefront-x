import type { App } from 'vue'
import { createRouter } from '../../Router'
import { routes } from '~/.sfx/pages'

export default async (app: App) => {
  const router = createRouter({
    routes,
  })

  await router.push(window.location.pathname + window.location.search + window.location.hash)

  app.use(router)
}
