import isObject from '#ioc/utils/isObject'

const mergeDeep = (target: object, ...sources: object[]): object => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) target[key] = {}
        mergeDeep(target[key], source[key])
      } else {
        target[key] = source[key]
      }
    }
  }

  return mergeDeep(target, ...sources)
}

export default mergeDeep
