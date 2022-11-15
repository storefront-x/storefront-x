import Checkout from '~/cypress/support/pageObjects/Checkout'
import Product from '~/cypress/support/pageObjects/Product'
import ThankYouPage from '~/cypress/support/pageObjects/ThankYouPage'

describe('Checkout', () => {
  /** @type {Checkout} */
  let checkout

  /** @type {Product} */
  let product

  /** @type {ThankYouPage} */
  let thankYouPage

  beforeEach(() => {
    checkout = new Checkout()
    product = new Product()
    thankYouPage = new ThankYouPage()
  })

  it('finishes checkout process', () => {
    product.visitRandom()
    product.addToCart()
    product.continueToCheckout()

    checkout.selectShipping('flatrate_flatrate')
    checkout.selectPayment('checkmo')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()

    thankYouPage.isVisible()
  })

  it('accepts credit card payment', () => {
    product.visitRandom()
    product.addToCart()
    product.continueToCheckout()

    checkout.selectShipping('flatrate_flatrate')
    checkout.selectPayment('braintree')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()
    checkout.fillCreditCardInfo()

    thankYouPage.isVisible()
  })

  it('supports instore pickup', () => {
    product.visitRandom()
    product.addToCart()
    product.continueToCheckout()

    checkout.selectShipping('instore_pickup')
    checkout.getInstorePickupLocation().click()
    checkout.selectPayment('checkmo')
    checkout.fillShippingInfo()
    checkout.confirmAgreements()
    checkout.placeOrder()

    thankYouPage.isVisible()
  })

  it('add valid coupon', () => {
    product.visitRandom()
    product.addToCart()
    product.continueToCheckout()

    checkout.getAddCoupon().click()
    checkout.getCouponCode().type('coupon_cypress_test')
    checkout.couponApply()
    checkout.getAppliedCoupon().eq(1).should('have.text', 'coupon_cypress_test')
    checkout.couponRemove()
    checkout.getAppliedCoupon().eq(1).should('not.exist')
  })

  it('add invalid coupon', () => {
    product.visitRandom()
    product.addToCart()
    product.continueToCheckout()

    checkout.getAddCoupon().click()
    checkout.getCouponCode().type('WrongCoupon')
    checkout.couponApply()
    checkout.getAppliedCoupon().should('not.exist')
    //cy.get('[data-cy=coupon-applied]').should('not.exist')
    cy.get('[data-cy="notification-body"]').should(
      'have.text',
      "The coupon code isn't valid. Verify the code and try again.",
    )
  })
})
