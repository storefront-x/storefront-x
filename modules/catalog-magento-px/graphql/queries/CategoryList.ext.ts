import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/graphql/addFields'
import Extension from '#ioc/types/base/Extension'

const CategoryList: Extension =
  (CategoryList) =>
  (...args: any[]) => {
    const self = CategoryList(...args)

    addFields(self, 'categories.items.children', {
      thumbnail: field(),
    })

    addFields(self, 'categories.items.children.children', {
      thumbnail: field(),
    })

    addFields(self, 'categories.items.children.children.children', {
      thumbnail: field(),
    })

    return self
  }

export default CategoryList
