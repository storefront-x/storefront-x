import type { App } from 'vue'
import globalComponents from '~/.sfx/global/components'

export default (app: App) => {
  for (const [name, component] of Object.entries(globalComponents)) {
    app.component(name, component as any)
  }
}
