export default () => {
  cy.get('[data-cy=product-title]')
    .invoke('text')
    .then((before) => {
      cy.get('[data-cy=filter-option]').last().click()

      cy.waitUntil(() =>
        cy
          .get('[data-cy=product-title]')
          .invoke('text')
          .then((after) => before !== after),
      )
    })
}
