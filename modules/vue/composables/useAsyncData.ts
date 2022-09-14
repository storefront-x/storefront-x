import { onServerPrefetch, ref, Ref, watch, WatchSource } from 'vue'
import useState from '#ioc/composables/useState'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import IS_SERVER from '#ioc/config/IS_SERVER'

type Response<T> = {
  data: Ref<T>
  pending: Ref<boolean>
  error: Ref<any>
  refresh: () => Promise<void>
}

interface Options {
  watch?: WatchSource<unknown>[]
}

type AsyncResponse<T> = Response<T> & Promise<Response<T>>

const wasHydrated = new Set<string>()

export default <T>(key: string, handler: () => Promise<T>, options: Options = {}): AsyncResponse<T> => {
  if (typeof key !== 'string') {
    throw new TypeError('asyncData key must be a string')
  }
  if (typeof handler !== 'function') {
    throw new TypeError('asyncData handler must be a function')
  }

  const data = useState<T>(key)

  const response = {
    data,
    pending: ref(false),
    error: ref(null),
  } as Response<T>

  let promise: Promise<void>

  response.refresh = () => {
    response.pending.value = true

    promise = Promise.resolve(handler())
      .then((result) => {
        response.data.value = result
        response.error.value = null
      })
      .catch((error: any) => {
        response.error.value = error
      })
      .finally(() => {
        response.pending.value = false
      })

    return promise
  }

  if (IS_SERVER) {
    promise = response.refresh()
    onServerPrefetch(() => promise)
  }

  if (IS_CLIENT) {
    if (!(data.value && !wasHydrated.has(key))) {
      response.refresh()
    }

    if (options.watch) {
      watch(options.watch, () => response.refresh())
    }

    wasHydrated.add(key)
  }

  const responsePromise = Promise.resolve(promise!).then(() => response) as AsyncResponse<T>

  return Object.assign(responsePromise, response) as AsyncResponse<T>
}
