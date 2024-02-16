import type { App } from 'vue'
import { createPinia } from 'pinia'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import plugins from '~/.sfx/vuePinia/plugins'

export default async (app: App, ctx: any) => {
  const pinia = createPinia()

  ctx.$pinia = pinia

  for (const plugin of Object.values(plugins) as any) {
    await plugin(ctx.$pinia)
  }

  app.use(pinia)
  console.log('APP USE PINIA')
  if (IS_CLIENT) {
    //@ts-ignore
    if (window.$pinia) pinia.state.value = window.$pinia
  }
}
