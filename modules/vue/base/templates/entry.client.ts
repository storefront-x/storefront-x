import useContext from '#ioc/composables/useContext'
import { createSSRApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import * as plugins from './vue/plugins.client'

const main = async () => {
  const app = createSSRApp(App)
  const ctx = useContext()

  ctx.$app = app

  for (const plugin of Object.values(plugins) as any) {
    if (plugin.default) {
      await plugin.default(app, ctx)
    }
  }

  app.mount('#app', true)
}

main().catch((err) => {
  console.error(err)
})
