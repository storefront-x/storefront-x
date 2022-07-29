import useGetSearchSuggestionsRepository from '#ioc/repositories/useGetSearchSuggestionsRepository'

export default () => {
  const getSearchSuggestionsRepository = useGetSearchSuggestionsRepository()

  return async (...args: Parameters<typeof getSearchSuggestionsRepository>) => {
    return await getSearchSuggestionsRepository(...args)
  }
}
