describe('Product', () => {
  it('contains title', () => {
    cy.visit('/3m-7000014557-display-privacy-filters-frameless-display-privacy-filter-43-2-cm-17.html')
    cy.get('h1').contains('3M 7000014557')
  })

  it('does not pass', () => {
    cy.visit('/3m-7000014557-display-privacy-filters-frameless-display-privacy-filter-43-2-cm-17')
    cy.get('h1').contains('3M 7000014557')
  })
})
