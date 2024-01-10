import useId from '#ioc/composables/useId'
import useState from '#ioc/composables/useState'
import IS_SERVER from '#ioc/config/IS_SERVER'
import { Ref, shallowRef, watch } from 'vue'

async function useResource<T>(source: () => Promise<T>): Promise<[Ref<T>, { refetch: () => Promise<void> }]>
async function useResource<T, U>(
  source: () => U,
  fetcher?: (source: U) => Promise<T>,
): Promise<[Ref<T>, { refetch: () => Promise<void> }]>
async function useResource(source: any, fetcher?: any) {
  if (!fetcher) {
    fetcher = source
    source = () => undefined
  }

  const response = shallowRef()
  const sourceData = source()
  const sourceIdent = sourceData ? JSON.stringify(sourceData) : ''
  const id = useId(sourceIdent)
  const state = useState<any>(id, () => undefined)

  const refetch = async () => {
    response.value = await fetcher(source())
  }

  const promise = new Promise<[any, any]>((resolve, reject) => {
    watch(
      [source],
      async ([source]) => {
        try {
          if (state.value) {
            response.value = state.value

            state.value = null
          } else {
            response.value = await fetcher(source)

            if (IS_SERVER) {
              state.value = response.value
            }
          }

          resolve([response, { refetch }])
        } catch (error) {
          reject(error)
        }
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
