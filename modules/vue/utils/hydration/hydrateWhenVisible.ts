import useContext from '#ioc/composables/useContext'
import IS_PRODUCTION from '#ioc/config/IS_PRODUCTION'
import IS_SERVER from '#ioc/config/IS_SERVER'
import { h, defineComponent, defineAsyncComponent, getCurrentInstance, onUnmounted } from 'vue'

export default (source: () => Promise<{ default: any }>): any => {
  if (IS_SERVER) {
    if (IS_PRODUCTION) {
      return defineAsyncComponent({
        loader: async () => {
          const component = await source()

          const setup = component.default.setup

          component.default.setup = function (...args: any[]) {
            const ctx = useContext()

            ctx.modulesAsync = ctx.modulesAsync ?? new Set<string>()

            const add = ctx.modules.add
            ctx.modules.add = function (module: string) {
              ctx.modulesAsync.add(module)
              add.call(this, module)
              return this
            }

            const response = setup.call(this, ...args)

            ctx.modules.add = add.bind(ctx.modules)

            return response
          }

          return component
        },
      })
    } else {
      return defineAsyncComponent(source)
    }
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
            Promise.resolve(source())
              .then((c) => () => h(c.default))
              .then(resolve)
          }
        })

        const el = currentInstance?.vnode.el as any
        if (el) intersectionObserver.observe(el)

        onUnmounted(() => {
          intersectionObserver.disconnect()
        })

        return promise
      },
    })
  }
}
