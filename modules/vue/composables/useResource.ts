import useId from '#ioc/composables/useId'
import useState from '#ioc/composables/useState'
import IS_SERVER from '#ioc/config/IS_SERVER'
import { ref, watch } from 'vue'

async function useResource<T>(source: () => T): Promise<[T]>
async function useResource<T, U>(source: () => U, fetcher?: (source: U) => T): Promise<[T]>
async function useResource(source: any, fetcher?: any) {
  if (!fetcher) {
    fetcher = source
    source = () => undefined
  }

  const response = ref()
  const id = useId()
  const state = useState<any>(id, () => undefined)

  const promise = new Promise<[any]>((resolve) => {
    watch(
      [source],
      async ([source]) => {
        if (state.value) {
          response.value = state.value

          state.value = null
        } else {
          response.value = await fetcher(source)

          if (IS_SERVER) {
            state.value = response.value
          }
        }

        resolve([response])
      },
      {
        immediate: true,
        flush: 'post',
      },
    )
  })

  return promise
}

export default useResource
