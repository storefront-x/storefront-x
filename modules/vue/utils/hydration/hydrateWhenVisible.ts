import IS_SERVER from '#ioc/config/IS_SERVER'
import { h, defineComponent, defineAsyncComponent, getCurrentInstance, onUnmounted } from 'vue'

export default (source: () => Promise<{ default: any }>): any => {
  if (IS_SERVER) {
    return defineAsyncComponent(source)
  } else {
    return defineComponent({
      name: 'HydrateWhenVisible',
      setup() {
        const currentInstance = getCurrentInstance()

        let resolve: (val: any) => void
        const promise = new Promise((r) => (resolve = r))

        const intersectionObserver = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            intersectionObserver.disconnect()

            requestIdleCallback(() => source().then((c) => resolve(() => h(c.default))))
          }
        })

        let el = currentInstance!.vnode.el as Element | null

        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (!el) {
            break
          }

          if (el.nodeName === '#comment') {
            el = el.nextElementSibling
            continue
          }

          intersectionObserver.observe(el)
          break
        }

        if (el) {
          onUnmounted(() => {
            intersectionObserver.disconnect()
          })

          return promise
        } else {
          intersectionObserver.disconnect()

          return source().then((c) => () => h(c.default))
        }
      },
    })
  }
}
