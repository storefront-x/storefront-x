/* eslint-disable vue/one-component-per-file */
import IS_SERVER from '#ioc/config/IS_SERVER'
import schedule from '#ioc/utils/schedule'
import { h, defineComponent, getCurrentInstance, defineAsyncComponent } from 'vue'

const name = 'HydrateWhenIdle'

export default (source: () => Promise<{ default: any }>): any => {
  const EagerComponent = defineAsyncComponent(source)

  let resolve: any

  const promise = new Promise<any>((_resolve) => {
    resolve = _resolve
  })

  const LazyComponent = defineAsyncComponent({
    loader: () => promise,
    suspensible: false,
  })

  if (IS_SERVER) {
    return defineComponent({
      name,
      setup() {
        return () => h(EagerComponent)
      },
    })
  } else {
    return defineComponent({
      name,
      setup() {
        const currentInstance = getCurrentInstance()

        // el is directly present in the setup function only during hydration
        // this might be a case of abusing implementation details but it kinda makes sense?
        const el = currentInstance!.vnode.el as Element | null

        const isHydration = !!el
        if (isHydration) {
          schedule(() => source().then(resolve))

          return () => h(LazyComponent)
        } else {
          return () => h(EagerComponent)
        }
      },
    })
  }
}
