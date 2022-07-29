import IS_SERVER from '#ioc/config/IS_SERVER'
import { Ref, isRef, reactive, toRef, useSSRContext } from 'vue'

let _reactiveState: any = null

export default <T>(key: string, init?: () => T | Ref<T>): Ref<T> => {
  let _state

  if (IS_SERVER) {
    const ssrContext = useSSRContext()!

    if (!ssrContext.$state) ssrContext.$state = reactive({})

    _state = ssrContext.$state
  } else {
    if (!_reactiveState) {
      //@ts-ignore
      _reactiveState = reactive(window.$state ?? {})
    }

    _state = _reactiveState
  }

  const state = toRef(_state, key)

  if (state.value === undefined && init) {
    const initialValue = init()

    if (isRef(initialValue)) {
      // vue will unwrap the ref for us
      _state[key] = initialValue
      return initialValue as Ref<T>
    }

    state.value = initialValue
  }

  return state
}
