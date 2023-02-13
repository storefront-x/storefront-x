import ToCompareList from '#ioc/mappers/ToCompareList'
import Extension from '#ioc/types/base/Extension'

interface Attributes {
  compareList: ReturnType<typeof ToCompareList> | null
}

const ToCustomer: Extension<Attributes> = (ToCustomer) => (data) => {
  const customer = ToCustomer(data)

  customer.compareList = data.compare_list ? ToCompareList(data.compare_list) : null

  return customer
}

export default ToCustomer
