import type { App } from 'vue'

export default (app: App) => {
  app.mixin({
    mounted() {
      if (this.$el) this.$el.__vue__ = this
    },

    updated() {
      if (this.$el) this.$el.__vue__ = this
    },
  })
}
