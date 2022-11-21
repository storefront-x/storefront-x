import useId from '#ioc/composables/useId'
import useState from '#ioc/composables/useState'
import IS_SERVER from '#ioc/config/IS_SERVER'
import { ref, watch } from 'vue'

export default async <T, U>(source: () => U, fetcher: (source: U) => T): Promise<[any]> => {
  const response = ref<T>()
  const id = useId()
  const state = useState<T | null | undefined>(id, () => undefined)

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
