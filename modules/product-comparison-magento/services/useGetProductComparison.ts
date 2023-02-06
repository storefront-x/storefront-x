import useCompareListId from '#ioc/composables/useCompareListId'
import useGetCompareListByIdRepository from '#ioc/repositories/useGetCompareListByIdRepository'

export default () => {
  const compareListId = useCompareListId()
  const getCompareListByIdRepository = useGetCompareListByIdRepository()

  return async () => {
    const id = compareListId.get()

    if (!id) {
      return {
        compareList: null,
      }
    } else {
      const { compareList } = await getCompareListByIdRepository(id)

      return {
        compareList,
      }
    }
  }
}
