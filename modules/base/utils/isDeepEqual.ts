import isArray from '#ioc/utils/isArray'
import isObject from '#ioc/utils/isObject'

const isDeepEqual = (a: any, b: any) => {
  if (a === b) {
    return true
  } else if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false

    for (let i = 0; i < a.length; i++) {
      if (!isDeepEqual(a[i], b[i])) return false
    }

    return true
  } else if (isObject(a) && isObject(b)) {
    if (Object.keys(a).length !== Object.keys(b).length) return false

    for (const key in a) {
      if (!isDeepEqual(a[key], b[key])) return false
    }

    return true
  } else {
    return false
  }
}

export default isDeepEqual
