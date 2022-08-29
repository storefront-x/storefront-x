import useUrlResolverRepository from '#ioc/repositories/useSubscribeEmailToNewsletter.'

export default () => {
  const useSubscribe = useUrlResolverRepository()

  return async (
    email: string,
  ): Promise<{
    statusText: string
    ok: boolean
  }> => {
    const { statusText, ok } = await useSubscribe(email)
    return {
      statusText,
      ok,
    }
  }
}
