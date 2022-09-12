/* eslint-disable vue/one-component-per-file */
import IS_SERVER from '#ioc/config/IS_SERVER'
import schedule from '#ioc/utils/schedule'
import { h, defineComponent, defineAsyncComponent } from 'vue'

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
        schedule(() => {
          source().then(resolve)
        })

        return () => h(LazyComponent)
      },
    })
  }
}
