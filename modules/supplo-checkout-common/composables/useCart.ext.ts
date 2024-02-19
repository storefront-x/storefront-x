import useCartStore from '#ioc/stores/useCartStore'
import { computed } from 'vue'
import ToCart from '#ioc/mappers/ToCart'
import ToShippingMethod from '#ioc/mappers/ToShippingMethod'
import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'
import ToMoney from '#ioc/mappers/ToMoney'
import ToOrderable from '#ioc/mappers/ToOrderable'
import ToOrderableErrorMessage from '#ioc/mappers/ToOrderableErrorMessage'
import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'
import ToCartItem from '#ioc/mappers/ToCartItem'

export default <T extends (...args: any[]) => any>(useCart: T) => {
  return (): ReturnType<T> & {
    setShippingMethodOnCart: (shippingMethod: any) => Promise<void>
    availableShippingMethods: ReturnType<typeof ToCart>[]
    availablePaymentMethods: ReturnType<typeof ToCart>[]
    shippingPrice: ReturnType<typeof ToMoney>
    selectedShippingMethod: ReturnType<typeof ToShippingMethod> | null
    selectedPaymentMethod: ReturnType<typeof ToPaymentMethod> | null
    billingAddress: ReturnType<typeof ToCustomerAddress> | null
    shippingAddress: ReturnType<typeof ToCustomerAddress> | null
    isShippingAddressSelected: boolean
    isBillingAddressSelected: boolean
    isShippingMethodSelected: boolean
    isPaymentMethodSelected: boolean
    containsVirtualOrDownloadableProduct: boolean
    containsOnlyVirtualOrDownloadableProducts: boolean
    subtotalExcludingTax: ReturnType<typeof ToMoney>
    isItemInCart: (sku: string) => boolean
  } => {
    const self = useCart()
    const cartStore = useCartStore()

    self.availableShippingMethods = computed(() => cartStore.cart?.availableShippingMethods ?? null)
    self.availablePaymentMethods = computed(() => cartStore.cart?.availablePaymentMethods ?? null)
    self.selectedPaymentMethod = computed(() => cartStore.cart?.selectedPaymentMethod ?? null)
    self.selectedShippingMethod = computed(() => cartStore.cart?.selectedShippingMethod ?? null)
    self.billingAddress = computed(() => cartStore.cart?.billingAddress ?? null)
    self.shippingAddress = computed(() => cartStore.cart?.shippingAddress ?? null)
    self.shippingPrice = computed(() => cartStore.cart?.shippingPrice ?? { value: 0 })

    self.grandTotal = computed(() => cartStore.cart?.prices.grandTotal ?? 0)

    self.containsOnlyVirtualOrDownloadableProducts = computed(() => {
      for (const item of cartStore.cart?.items ?? []) {
        if (item.product.__typename === 'DownloadableProduct' || item.product.__typename === 'VirtualProduct') {
          return true
        }
      }

      return false
    })

    self.containsOnlyVirtualOrDownloadableProducts = computed(() => {
      for (const item of cartStore.cart?.items ?? []) {
        if (item.product.__typename !== 'DownloadableProduct' && item.product.__typename !== 'VirtualProduct') {
          return false
        }
      }

      return true
    })

    self.subtotalExcludingTax = computed(() => cartStore.cart?.prices.subtotalExcludingTax)

    self.isItemInCart = (sku: string) => {
      if (!self._wasHydrated) return false

      return cartStore.cart?.items.some((item: ReturnType<typeof ToCartItem>) => item.product.sku === sku) ?? false
    }
    self.isShippingAddressSelected = computed(() => self.shippingAddress !== null)
    self.isBillingAddressSelected = computed(() => self.billingAddress !== null)
    self.isShippingMethodSelected = computed(() => self.selectedShippingMethod !== null)
    self.isPaymentMethodSelected = computed(() => self.selectedPaymentMethod !== null)

    return self
  }
}
