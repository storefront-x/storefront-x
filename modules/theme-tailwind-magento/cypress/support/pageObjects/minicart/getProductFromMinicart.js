export default (position) => cy.get('[data-cy=minicart-item]').eq(position ?? 0)
