import useContext from '#ioc/composables/useContext'

export default <C extends () => B, B extends (...args: any[]) => R, R>(composable: C) => {
  const id = Symbol()

  return (): B => {
    const ctx = useContext()

    if (!ctx.__recursiveComposableCache) {
      ctx.__recursiveComposableCache = {}
    }

    const cache = ctx.__recursiveComposableCache

    if (!cache[id]) {
      cache[id] = true // placeholder
      const binded = composable()
      cache[id] = binded
      return binded
    } else {
      // @ts-ignore - we know what we are doing
      return (...args) => cache[id](...args)
    }
  }
}
