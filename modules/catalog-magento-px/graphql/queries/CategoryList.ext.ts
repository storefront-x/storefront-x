import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/magento/addFields'

export default <T extends (...args: any[]) => any>(CategoryList: T) =>
  (...args: any[]): ReturnType<T> => {
    const self = CategoryList(...args)

    addFields(self, 'categoryList.children', {
      thumbnail: field(),
    })

    addFields(self, 'categoryList.children.children', {
      thumbnail: field(),
    })

    addFields(self, 'categoryList.children.children.children', {
      thumbnail: field(),
    })

    return self
  }
