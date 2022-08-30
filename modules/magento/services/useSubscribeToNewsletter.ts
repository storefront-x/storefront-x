import useSubscribeEmailToNewsletterRepository from '#ioc/repositories/useSubscribeEmailToNewsletterRepository'

export default () => {
  const subscribeEmailToNewsletterRepository = useSubscribeEmailToNewsletterRepository()

  return async (
    email: string,
  ): Promise<{
    statusText: string
    ok: boolean
  }> => {
    const { statusText, ok } = await subscribeEmailToNewsletterRepository(email)
    return {
      statusText,
      ok,
    }
  }
}
