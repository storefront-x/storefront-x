import { defineStore } from 'pinia'
import useToCurrency from '#ioc/mappers/useToCurrency'
import useToStoreConfig from '#ioc/mappers/useToStoreConfig'

export default defineStore('store', {
  state: () => ({
    currency: null as ReturnType<ReturnType<typeof useToCurrency>> | null,
    selectedCurrencyCode: '',
    storeConfig: {} as ReturnType<ReturnType<typeof useToStoreConfig>>,
  }),
})
