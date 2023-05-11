import hashCode from '#ioc/utils/string/hashCode'
import { getCurrentInstance } from 'vue'

export default (sourceIdent?: string): string => {
  const currentInstance = getCurrentInstance()

  let instance = currentInstance
  let ident = ''

  while (instance) {
    ident += instance.type.name
    instance = instance.parent
  }

  return String(hashCode(ident + sourceIdent))
}
