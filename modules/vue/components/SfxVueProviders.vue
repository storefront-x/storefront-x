<script>
import { defineComponent, h, Suspense } from 'vue'
import IS_SERVER from '#ioc/config/IS_SERVER'
import clientProviders from '~/.sfx/vue/providers.client'
import serverProviders from '~/.sfx/vue/providers.server'

export default defineComponent({
  setup(props, { slots }) {
    return () =>
      h(Suspense, () => {
        let vnode = slots.default()

        // TODO: It looks like server providers are leaking to client build
        for (const provider of Object.values(IS_SERVER ? serverProviders : clientProviders).reverse()) {
          const _child = vnode
          vnode = h(provider, () => _child)
        }

        return vnode
      })
  },
})
</script>
