import getOrderSummaryItems from '~/cypress/support/pageObjects/checkout/getOrderSummaryItems'
import selectShipping from '~/cypress/support/pageObjects/checkout/selectShipping'
import selectPayment from '~/cypress/support/pageObjects/checkout/selectPayment'
import fillShippingInfo from '~/cypress/support/pageObjects/checkout/fillShippingInfo'
import confirmAgreements from '~/cypress/support/pageObjects/checkout/confirmAgreements'
import placeOrder from '~/cypress/support/pageObjects/checkout/placeOrder'
import fillCreditCardInfo from '~/cypress/support/pageObjects/checkout/fillCreditCardInfo'
import getInstorePickupLocation from '~/cypress/support/pageObjects/checkout/getInstorePickupLocation'
import checkThankYouPageVisibility from '~/cypress/support/pageObjects/thankYouPage/checkThankYouPageVisibility'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import continueToCheckout from '~/cypress/support/pageObjects/product/continueToCheckout'
import Product from '~/cypress/support/pageObjects/product/Product'
import getAppliedCoupons from '~/cypress/support/pageObjects/checkout/getAppliedCoupons'
import removeCoupon from '~/cypress/support/pageObjects/checkout/removeCoupon'
import getNotificationToast from '~/cypress/support/pageObjects/base/getNotificationToast'
import setCoupon from '~/cypress/support/pageObjects/checkout/setCoupon'

describe('Checkout', () => {
  /** @type {Product} */
  let product = null

  beforeEach(() => {
    product = new Product()
    addRandomProductToCartAndProceedToCheckout(product)
  })

  let addRandomProductToCartAndProceedToCheckout = (product) => {
    visitRandom(product)
    addToCart()
    continueToCheckout()
  }

  it('checks that reload wont delete checkout', () => {
    getOrderSummaryItems()
    cy.reload().waitForSfx()
    getOrderSummaryItems()
  })

  it('finishes checkout process', () => {
    const shippingMethod = 'flatrate_flatrate'

    selectShipping(shippingMethod)
    selectPayment('checkmo')
    fillShippingInfo(shippingMethod)
    confirmAgreements()
    placeOrder()

    checkThankYouPageVisibility()
  })

  it('accepts credit card payment', () => {
    const shippingMethod = 'flatrate_flatrate'

    selectShipping(shippingMethod)
    selectPayment('braintree')
    fillShippingInfo(shippingMethod)
    confirmAgreements()
    placeOrder()
    fillCreditCardInfo()

    checkThankYouPageVisibility()
  })

  it('supports instore pickup', () => {
    const shippingMethod = 'instore_pickup'

    selectShipping(shippingMethod)
    getInstorePickupLocation().click()
    selectPayment('checkmo')
    fillShippingInfo(shippingMethod)
    confirmAgreements()
    placeOrder()

    checkThankYouPageVisibility()
  })

  it('add valid coupon', () => {
    const couponName = 'coupon_cypress_test'

    setCoupon(couponName)
    getAppliedCoupons().should('have.text', couponName)
    removeCoupon()
    getAppliedCoupons().should('not.exist')
  })

  it('add invalid coupon', () => {
    const couponName = 'wrong_coupon_code'

    setCoupon(couponName)
    getNotificationToast().should('not.be.empty')
  })

  it('place two orders', () => {
    const shippingMethod = 'flatrate_flatrate'

    selectShipping(shippingMethod)
    selectPayment('checkmo')
    fillShippingInfo(shippingMethod)
    confirmAgreements()
    placeOrder()
    checkThankYouPageVisibility()

    addRandomProductToCartAndProceedToCheckout(product)
    selectShipping(shippingMethod)
    selectPayment('checkmo')
    fillShippingInfo(shippingMethod)
    confirmAgreements()
    placeOrder()
    checkThankYouPageVisibility()
  })
})
