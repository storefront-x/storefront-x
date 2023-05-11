import hashCode from '#ioc/utils/string/hashCode'
import { getCurrentInstance } from 'vue'

export default (sourceData: any): string => {
  const currentInstance = getCurrentInstance()

  let instance = currentInstance
  let ident = ''
  const sourceIdent = sourceData ? JSON.stringify(sourceData) : ''

  while (instance) {
    ident += instance.type.name
    instance = instance.parent
  }

  return String(hashCode(ident + sourceIdent))
}
