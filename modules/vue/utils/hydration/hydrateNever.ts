/* eslint-disable vue/one-component-per-file */
import IS_SERVER from '#ioc/config/IS_SERVER'
import { h, defineComponent, defineAsyncComponent, getCurrentInstance } from 'vue'

const name = 'HydrateNever'

export default (source: () => Promise<{ default: any }>): any => {
  const EagerComponent = defineAsyncComponent(source)

  const LazyComponent = defineAsyncComponent({
    loader: () => new Promise<any>(() => ({})),
    suspensible: false,
  })

  if (IS_SERVER) {
    return defineComponent({
      name,
      setup() {
        return () => h(EagerComponent)
      },
    })
  }

  return defineComponent({
    name,
    setup() {
      const currentInstance = getCurrentInstance()

      // el is directly present in the setup function only during hydration
      // this might be a case of abusing implementation details but it kinda makes sense?
      const el = currentInstance!.vnode.el as Element | null

      const isHydration = !!el
      if (isHydration) {
        return () => h(LazyComponent)
      } else {
        return () => h(EagerComponent)
      }
    },
  })
}
