import useGetProductById from '#ioc/services/useGetProductById'
import { reactive } from 'vue'

const productPaths: {
  id: string
  path: string
}[] = reactive([])

export default () => {
  const getProductById = useGetProductById()

  return {
    async getById(id: string) {
      const path = productPaths.find((path) => path.id === id)
      if (path) {
        return path.path
      } else {
        const {
          product: { id: productId, urlPath },
        } = await getProductById(id)
        this.add({ id: productId, urlPath })
        return urlPath
      }
    },
    add(product: { id: string; urlPath: string }) {
      const isPathExists = productPaths.find((path) => path.id === product.id)
      if (!isPathExists) {
        productPaths.push({
          id: product.id,
          path: product.urlPath,
        })
      }
      return
    },
  }
}
