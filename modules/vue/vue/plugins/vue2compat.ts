import type { App } from 'vue'

export default (app: App) => {
  app.mixin({
    mounted() {
      this.$el.__vue__ = this
    },

    updated() {
      this.$el.__vue__ = this
    },
  })
}
