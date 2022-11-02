import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import Extension from '#ioc/types/base/Extension'

interface ToCategoryType {
  thumbnailUrl: string
}

const ToCategory: Extension<ToCategoryType> = (ToCategory) => (data) => ({
  ...ToCategory(data),
  thumbnailUrl: data.thumbnail ? MAGENTO_URL + '/media/catalog/category/' + data.thumbnail : null,
})

export default ToCategory
