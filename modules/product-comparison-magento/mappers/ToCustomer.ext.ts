import ToCompareList from '#ioc/mappers/ToCompareList'
import Extension from '#ioc/types/base/Extension'

interface Attributes {
  compareList: ReturnType<typeof ToCompareList>
}

const ToCustomer: Extension<Attributes> = (ToCustomer) => (data) => {
  const customer = ToCustomer(data)

  customer.compareList = ToCompareList(data.compareList)

  return customer
}

export default ToCustomer
