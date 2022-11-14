import type { App } from 'vue'
import { createRouter } from '../../Router'

export default async (app: App, ctx: any) => {
  const router = createRouter()
  await router.push(ctx.req.url)

  app.use(router)
}
