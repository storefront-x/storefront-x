export default class Checkout {
  constructor() {
    this.shippingMethod = null
    this.paymentMethod = null
  }

  selectShipping(code) {
    this.shippingMethod = code

    cy.get(`[data-shipping-method=${code}]`).click()
  }

  selectPayment(code) {
    this.paymentMethod = code

    cy.get(`[data-payment-method=${code}]`).click()
  }

  fillShippingInfo() {
    cy.get('input[name=email]').type('tester@testovic.cz')
    cy.get('input[name=firstName]').type('Tester')
    cy.get('input[name=lastName]').type('Testovič')
    cy.get('input[name=telephone]').type('123456789')

    if (this.shippingMethod !== 'instore_pickup') {
      cy.get('input[name=street]').type('Testovací 123')
      cy.get('input[name=city]').type('Brnel')
      cy.get('input[name=postcode]').type('12345')
    }
  }

  fillCreditCardInfo() {
    cy.withinIframe('#braintree-hosted-field-number').find('input[name=credit-card-number]').type('4111111111111111')

    cy.withinIframe('#braintree-hosted-field-expirationDate').find('input[name=expiration]').type('1122')

    cy.withinIframe('#braintree-hosted-field-cvv').find('input[name=cvv]').type('123')

    cy.get('[data-cy=braintree-confirm]').click()
  }

  confirmAgreements() {
    cy.get('[data-cy=checkout-agreements] input[type=checkbox]').click({ multiple: true })
  }

  placeOrder() {
    cy.get('[data-cy=place-order]').click()
  }

  getInstorePickupLocation() {
    return cy.get('[data-cy=instore-pickup-location]').first()
  }

  getCustomerAddress() {
    return cy.get('[data-cy=customer-address]').first()
  }
}
