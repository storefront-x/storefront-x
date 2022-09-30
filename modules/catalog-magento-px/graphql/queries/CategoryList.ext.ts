import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/addFields'

interface Extension<Ext = Record<string, never>> {
  <T extends (...arg: any) => any>(useProduct: T): (...arg: any) => ReturnType<T> & Ext
}

const CategoryList: Extension =
  (CategoryList) =>
  (...args: any[]) => {
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

export default CategoryList
