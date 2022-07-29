import type { App } from 'vue'
import { createPinia } from 'pinia'
import IS_CLIENT from '#ioc/config/IS_CLIENT'

export default async (app: App, ctx: any) => {
  const pinia = createPinia()

  ctx.$pinia = pinia

  app.use(pinia)

  if (IS_CLIENT) {
    //@ts-ignore
    if (window.$pinia) pinia.state.value = window.$pinia
  }
}
