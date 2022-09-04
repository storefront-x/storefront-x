import MAGENTO_URL from '#ioc/config/MAGENTO_URL'

interface Extension<Ext = Record<string, never>> {
  <T extends (...arg: any) => any>(useProduct: T): (...arg: any) => ReturnType<T> & Ext
}

interface ToCategory {
  thumbnailUrl: string
}

const ToCategory: Extension<ToCategory> = (ToCategory) => (data) => ({
  ...ToCategory(data),
  thumbnailUrl: data.thumbnail ? MAGENTO_URL + '/media/catalog/category/' + data.thumbnail : null,
})

export default ToCategory
