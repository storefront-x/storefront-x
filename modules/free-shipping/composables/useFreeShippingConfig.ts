import useFreeShippingStore from '#ioc/stores/useFreeShippingStore'
import useStoreStore from '#ioc/stores/useStoreStore'
import ToMoney from '#ioc/mappers/ToMoney'
import { computed, reactive } from 'vue'

export default () => {
  const freeShippingStore = useFreeShippingStore()
  const storeStore = useStoreStore()

  const limit = computed(() =>
    ToMoney({
      value: freeShippingStore.freeShippingConfig?.limit ?? Number(null),
      // TODO: fix currency code
      currency: storeStore.currency?.code ?? 'EUR',
    }),
  )

  return reactive({
    limit,
  })
}
