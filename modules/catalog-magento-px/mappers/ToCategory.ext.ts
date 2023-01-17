import ToMagentoImage from '#ioc/mappers/ToMagentoImage'
import Extension from '#ioc/types/base/Extension'

interface ThumbnailUrl {
  thumbnailUrl: string
}

const ToCategory: Extension<ThumbnailUrl> = (ToCategory) => (data) => {
  const self = ToCategory(data)

  self.thumbnailUrl = data.thumbnail ? ToMagentoImage('/media/catalog/category/' + data.thumbnail) : null

  return self
}

export default ToCategory
