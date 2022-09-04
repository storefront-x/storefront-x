import MAGENTO_URL from '#ioc/config/MAGENTO_URL'

export default <T extends (data: any) => any>(ToCategory: T) =>
  (data: any): ReturnType<T> => ({
    ...ToCategory(data),
    thumbnailUrl: data.thumbnail ? MAGENTO_URL + '/media/catalog/category/' + data.thumbnail : null,
  })
