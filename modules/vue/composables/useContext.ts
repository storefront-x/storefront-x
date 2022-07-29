import { useSSRContext } from 'vue'
import IS_SERVER from '#ioc/config/IS_SERVER'

const ctx = {}

export default (): Record<string, any> => {
  if (IS_SERVER) {
    return useSSRContext()!
  } else {
    return ctx
  }
}
