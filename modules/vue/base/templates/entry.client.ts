import useContext from '#ioc/composables/useContext'
import { createSSRApp } from 'vue'
import App from '~/.sfx/App.vue'
import plugins from '~/.sfx/vue/plugins.client'

const main = async () => {
  const app = createSSRApp(App)
  const ctx = useContext()

  ctx.$app = app

  app.mixin({
    mounted() {
      this.$el.__vue__ = this
    },
  })

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
