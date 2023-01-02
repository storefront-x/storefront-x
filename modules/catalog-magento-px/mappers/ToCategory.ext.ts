import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import Extension from '#ioc/types/base/Extension'

interface ThumbnailUrl {
  thumbnailUrl: string
}

const ToCategory: Extension<ThumbnailUrl> = (ToCategory) => (data) => {
  const self = ToCategory(data)

  self.thumbnailUrl = data.thumbnail ? MAGENTO_URL + '/media/catalog/category/' + data.thumbnail : null

  return self
}

export default ToCategory
