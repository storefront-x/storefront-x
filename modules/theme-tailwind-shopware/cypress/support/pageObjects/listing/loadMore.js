export default () => {
  cy.get('[data-cy=product-title]')
    .last()
    .invoke('text')
    .then((before) => {
      cy.get('[data-cy=load-more]').click()
      cy.waitUntil(() =>
        cy
          .get('[data-cy=product-title]')
          .last()
          .invoke('text')
          .then((after) => before !== after),
      )
    })
}
