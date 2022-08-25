import useUrlResolverRepository from '#ioc/repositories/useSubscribeEmailToNewsletter.'

export default () => {
  const useSubscribe = useUrlResolverRepository()

  return async (
    email: string,
  ): Promise<{
    status?: string
    _error?: string
  }> => {
    const { status, _error } = await useSubscribe(email)
    return {
      status,
      _error,
    }
  }
}
