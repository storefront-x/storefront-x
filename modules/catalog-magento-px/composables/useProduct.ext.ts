interface Extension<Ext = Record<string, never>> {
  <T extends (...arg: any) => any>(useProduct: T): (...arg: any) => ReturnType<T> & Ext
}

interface UseProduct {
  message: string
}

const useProduct: Extension<UseProduct> =
  (useProduct) =>
  (...args) => {
    const product = useProduct(...args)

    product.message = 'Hello, World!'

    return product
  }

export default useProduct
