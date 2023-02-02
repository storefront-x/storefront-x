import addFields from '#ioc/utils/graphql/addFields'
import CompareList from '#ioc/graphql/fragments/CompareList'
import field from '#ioc/graphql/field'
import Extension from '#ioc/types/base/Extension'

const Customer: Extension = (Customer) => () => {
  const self = Customer()

  addFields(self, {
    compare_list: field({ ...CompareList() }),
  })

  return self
}

export default Customer
