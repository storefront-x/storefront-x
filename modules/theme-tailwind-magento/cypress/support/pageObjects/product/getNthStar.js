export default function getNthStar(type, n) {
  return cy.get(`[data-cy=${type}] svg:nth-of-type(${n})`)
}
