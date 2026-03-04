import getBlogTitle from '~/cypress/support/pageObjects/blogCategory/getBlogTitle'
import getBlogPostTiles from '~/cypress/support/pageObjects/blogCategory/getBlogPostTiles'
import visitRandomBlogCategory from '~/cypress/support/pageObjects/blogCategory/visitRandomBlogCategory'

describe('Blog category', () => {
  beforeEach(() => {
    visitRandomBlogCategory()
  })

  it('renders its name', () => {
    cy.get('@randomBlogCategory').then((blogCategory) => {
      cy.log(blogCategory)
      getBlogTitle().should('include.text', blogCategory.name)
    })
  })

  it('has blog posts', () => {
    cy.get('@randomBlogCategory').then((blogCategory) => {
      getBlogPostTiles().should('have.length.at.most', blogCategory.post_count)
    })
  })
})
