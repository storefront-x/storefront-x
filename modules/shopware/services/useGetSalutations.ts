import useGetSalutationsRepository from '#ioc/repositories/useGetSalutationsRepository'

export default () => {
  const getSalutations = useGetSalutationsRepository()

  return async (...args: Parameters<typeof getSalutations>) => {
    return await getSalutations(...args)
  }
}
