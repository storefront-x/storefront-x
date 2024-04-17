import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('checkout', {
  state: () => ({
    customerPricesValid: false as boolean,
    selectedDeliveryDay: null as Date | null,
    loadingPrepareCheckout: true as boolean,
    returnablePackagingProductsToSelect: [],
  }),
})
