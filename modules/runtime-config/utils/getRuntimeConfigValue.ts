import consola from 'consola'
import IS_DEVELOPMENT from '#ioc/config/IS_DEVELOPMENT'
import IS_SERVER from '#ioc/config/IS_SERVER'
import once from '#ioc/utils/once'
import runtimeConfig from '~/.sfx/runtime/config'

export default <Key extends keyof typeof runtimeConfig>(key: Key): (typeof runtimeConfig)[Key] => {
  const obj = IS_SERVER ? runtimeConfig : window.$runtimeConfig
  if (!obj) {
    return null
  }
  if (IS_DEVELOPMENT && !(key in obj)) {
    once(`Runtime config ${key} is missing`, (msg) => consola.withTag('runtime-config').warn(msg))
  }

  return obj[key]
}
