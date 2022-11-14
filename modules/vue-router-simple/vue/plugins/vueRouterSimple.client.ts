import type { App } from 'vue'
import { createRouter } from '../../Router'

export default async (app: App) => {
  const router = createRouter()

  await router.push(window.location.pathname + window.location.search + window.location.hash)

  app.use(router)
}
