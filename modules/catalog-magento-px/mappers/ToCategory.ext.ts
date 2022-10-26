import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import Extension from '#ioc/types/base/Extension'
import ToCategoryType from '#ioc/types/catalog-magento-px/ToCategoryType'

const ToCategory: Extension<ToCategoryType> = (ToCategory) => (data) => ({
  ...ToCategory(data),
  thumbnailUrl: data.thumbnail ? MAGENTO_URL + '/media/catalog/category/' + data.thumbnail : null,
})

export default ToCategory
