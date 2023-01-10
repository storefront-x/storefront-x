export default class Multicurrency {
  selectDifferentCurrency() {
    cy.get('[data-cy=product-price')
      .invoke('text')
      .then((originalPrice) => {
        cy.get('[data-cy=currency-switcher]').click()
        cy.get('[data-cy=currency-switcher] a:last-child').click()

        cy.get('[data-cy=product-price').invoke('text').should('not.equal', originalPrice)
      })
  }
}
