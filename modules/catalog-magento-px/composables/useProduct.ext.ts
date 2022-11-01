import Extension from '#ioc/types/base/Extension'
import UseProductType from '#ioc/types/catalog-magento-px/UseProductType'

const useProduct: Extension<UseProductType> =
  (useProduct) =>
  (...args) => {
    const product = useProduct(...args)

    product.message = 'Hello, World!'

    return product
  }

export default useProduct
