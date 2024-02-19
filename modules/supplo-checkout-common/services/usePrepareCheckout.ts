// @ts-nocheck
import waitForStore from '#ioc/utils/vuePinia/waitForStore'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useCart from '#ioc/composables/useCart'
import useCustomer from '#ioc/composables/useCustomer'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useSetShippingMethodOnCart from '#ioc/services/useSetShippingMethodOnCart'
import useSetShippingAddressOnCart from '#ioc/services/useSetShippingAddressOnCart'
import useSetBillingAddressOnCart from '#ioc/services/useSetBillingAddressOnCart'
import useSetPaymentMethodOnCart from '#ioc/services/useSetPaymentMethodOnCart'

export default () => {
  const customerStore = useCustomerStore()
  const cart = useCart()
  const customer = useCustomer()
  const checkoutStore = useCheckoutStore()
  const setShippingAddressOnCart = useSetShippingAddressOnCart()
  const setShippingMethodOnCart = useSetShippingMethodOnCart()
  const setBillingAddressOnCart = useSetBillingAddressOnCart()
  const setPaymentMethodOnCart = useSetPaymentMethodOnCart()

  return async () => {
    await waitForStore(
      customerStore,
      () => customerStore.customer !== undefined,
      async () => {
        if (customerStore.customer) {
          await setShippingAddressOnCart(
            customer.addresses.find((address: any) => address.defaultShipping) ?? customer.addresses[0],
          )

          await setShippingMethodOnCart(
            cart.availableShippingMethods.find((method: any) => method.methodCode === 'flatrate') ?? null,
          )

          await setBillingAddressOnCart(
            customer.addresses.find((address: any) => address.defaultBilling) ?? customer.addresses[0],
          )

          await setPaymentMethodOnCart(
            cart.availablePaymentMethods.find((method: any) => method.code === 'banktransfer') ?? null,
          )

          checkoutStore.$patch({ loadingPrepareCheckout: false })
        }
      },
    )
  }
}
