import ToProductAttribute from '#ioc/mappers/ToProductAttribute'

import Extension from '#ioc/types/base/Extension'

interface ToProductType {
  attributes2: ReturnType<typeof ToProductAttribute>[]
}

const ToProduct: Extension<ToProductType> = (ToProduct) => (data) => ({
  ...ToProduct(data),
  attributes: data?.sfx_attributes?.map(ToProductAttribute) ?? [],
})

export default ToProduct
