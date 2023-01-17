export default () => {
  cy.get('[data-cy=store-switcher]')
    .invoke('text')
    .waitForSfx()
    .then((originalStore) => {
      cy.get('[data-cy=store-switcher]').should('be.visible').click()

      cy.get('[data-cy=store-switcher] a:last-child').should('be.visible').click()

      cy.get('[data-cy=store-switcher]').invoke('text').should('not.equal', originalStore)
    })
}
