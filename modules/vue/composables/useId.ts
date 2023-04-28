import useContext from '#ioc/composables/useContext'
import hashCode from '#ioc/utils/string/hashCode'
import { getCurrentInstance } from 'vue'

export default (): string => {
  const ctx = useContext()
  const currentInstance = getCurrentInstance()

  ctx.__useIdHashes ??= new Map()

  let ident = ''
  let instance = currentInstance

  while (instance) {
    ident += instance.type.name
    instance = instance.parent
  }

  const hash = String(hashCode(ident))

  if (ctx.__useIdHashes.has(hash)) {
    ctx.__useIdHashes.set(hash, ctx.__useIdHashes.get(hash) + 1)
  } else {
    ctx.__useIdHashes.set(hash, 0)
  }

  return `${hash}-${ctx.__useIdHashes.get(hash)}`
}
