import getBlogTitle from '~/cypress/support/pageObjects/blogCategory/getBlogTitle'
import getBlogPostTiles from '~/cypress/support/pageObjects/blogCategory/getBlogPostTiles'
import visitRandom from '~/cypress/support/pageObjects/blogCategory/visitRandom'

describe('Blog category', () => {
  beforeEach(() => {
    visitRandom().as('blogCategory')
  })

  it('renders its name', () => {
    cy.get('@blogCategory').then((blogCategory) => {
      getBlogTitle().will('include.text', () => blogCategory.data.name)
    })
  })

  it('has blog posts', () => {
    cy.get('@blogCategory').then((blogCategory) => {
      getBlogPostTiles().will('have.length.at.most', () => blogCategory.data.post_count)
    })
  })
})
