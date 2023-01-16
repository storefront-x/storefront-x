export default (type, n) => cy.get(`[data-cy=${type}] svg:nth-of-type(${n})`)
