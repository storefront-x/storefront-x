import IS_SERVER from '#ioc/config/IS_SERVER'
import runtimeConfig from '~/.sfx/runtime/config'

export default <Key extends keyof typeof runtimeConfig>(key: Key): typeof runtimeConfig[Key] => {
  if (IS_SERVER) {
    return runtimeConfig[key]
  } else {
    // @ts-ignorex
    return window.$runtimeConfig[key]
  }
}
