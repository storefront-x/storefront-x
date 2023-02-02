import ToCompareList from '#ioc/mappers/ToCompareList'
import Extension from '#ioc/types/base/Extension'

interface Attributes {
  compareList: ReturnType<typeof ToCompareList>
}

const ToCustomer: Extension<Attributes> = (ToCustomer) => (data) => {
  const customer = ToCustomer(data)

  customer.compareList = ToCompareList(data?.compare_list ?? {})

  return customer
}

export default ToCustomer
