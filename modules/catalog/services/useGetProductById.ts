import useGetProductByIdRepository from '#ioc/repositories/useGetProductByIdRepository'
import fromBase64 from '#ioc/utils/string/fromBase64'

export default () => {
  const getProductByIdRepository = useGetProductByIdRepository()

  return async (id: string) => {
    const decodeId = fromBase64(id)
    return await getProductByIdRepository(decodeId)
  }
}
