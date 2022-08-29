import useFreeShippingStore from '#ioc/stores/useFreeShippingStore'
import useStoreStore from '#ioc/stores/useStoreStore'
import useToMoney from '#ioc/mappers/useToMoney'
import { computed, reactive } from 'vue'

export default () => {
  const freeShippingStore = useFreeShippingStore()
  const storeStore = useStoreStore()
  const toMoney = useToMoney()

  const limit = computed(() =>
    toMoney({
      value: freeShippingStore.freeShippingConfig?.limit ?? Number(null),
      // TODO: fix currency code
      currency: storeStore.currency?.code ?? 'EUR',
    }),
  )

  return reactive({
    limit,
  })
}
