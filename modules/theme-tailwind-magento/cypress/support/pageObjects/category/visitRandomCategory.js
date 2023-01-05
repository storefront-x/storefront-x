import GetRandomCategory from '~/cypress/support/repositories/GetRandomCategory'
import getCategoryTitle from '~/cypress/support/pageObjects/category/getCategoryTitle'

export default function visitRandom(options) {
  return GetRandomCategory(options).then((category) => {
    return cy
      .visit(category.url_key + category.url_suffix)
      .waitForSfx()
      .then(() => {
        getCategoryTitle().will('include.text', () => category.name)
      })
  })
}
