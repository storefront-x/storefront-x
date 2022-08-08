import { Fragment } from '../GraphQL'
import isFunction from '#ioc/utils/isFunction'

export default (...args: any) => {
  const f = new Fragment(...args)

  const wrapper = {
    [f._name]: f,
  }

  const proxy: any = new Proxy(wrapper, {
    get(target: any, prop: any) {
      if (target[prop]) {
        return target[prop]
      } else {
        const value = f[prop as keyof typeof f]

        if (isFunction(value)) {
          return value.bind(proxy)
        } else {
          return value
        }
      }
    },
    set(_, prop, value) {
      f[prop as keyof typeof f] = value

      return true
    },
  })

  return proxy
}
