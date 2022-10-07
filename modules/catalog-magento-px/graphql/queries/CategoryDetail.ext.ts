import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/graphql/addFields'

export default <T extends (...args: any[]) => any>(CategoryDetail: T) =>
  (...args: any[]): ReturnType<T> => {
    const self = CategoryDetail(...args)

    addFields(self, 'categoryList', {
      thumbnail: field(),
    })

    addFields(self, 'categoryList.children', {
      thumbnail: field(),
    })

    return self
  }
