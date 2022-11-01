import hashCode from '#ioc/utils/string/hashCode'
import { getCurrentInstance } from 'vue'

export default (): string => {
  const currentInstance = getCurrentInstance()

  let ident = ''
  let instance = currentInstance

  while (instance) {
    ident += instance.type.name
    instance = instance.parent
  }

  return String(hashCode(ident))
}
