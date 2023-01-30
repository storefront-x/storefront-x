import Extension from '#ioc/types/base/Extension'

interface ToProductBrand {
  brand: {
    name: string
  }
}

const ToProduct: Extension<ToProductBrand> = (ToProduct) => (data) => {
  const self = ToProduct(data)

  self.brand = {
    name: data.brand ?? '',
  }

  return self
}

export default ToProduct
