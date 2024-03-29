import useContext from '#ioc/composables/useContext'

export default <T extends () => R, R>(composable: T): T => {
  const id = Symbol()

  // @ts-ignore
  return (): R => {
    const ctx = useContext()

    if (!ctx.__memoComposableCache) {
      ctx.__memoComposableCache = {}
    }

    const cache = ctx.__memoComposableCache

    if (!cache[id]) {
      cache[id] = true // placeholder
      const binded = composable()
      cache[id] = binded
      return binded
    } else {
      return cache[id]
    }
  }
}
