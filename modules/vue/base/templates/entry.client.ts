import useContext from '#ioc/composables/useContext'
import schedule from '#ioc/utils/schedule'
import { createSSRApp } from 'vue'
import App from '~/.sfx/App.vue'
import plugins from '~/.sfx/vue/plugins.client'

const main = async () => {
  const app = createSSRApp(App)
  const ctx = useContext()

  ctx.$app = app

  for (const plugin of Object.values(plugins) as any) {
    if (plugin.default) {
      await plugin.default(app, ctx)
    }
  }

  schedule(() => app.mount('#app', true))
}

main().catch((err) => {
  console.error(err)
})
