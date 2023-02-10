import useSubscribeEmailToNewsletterRepository from '#ioc/repositories/useSubscribeEmailToNewsletterRepository'

export default () => {
  const subscribeEmailToNewsletterRepository = useSubscribeEmailToNewsletterRepository()

  return async (
    email: string,
  ): Promise<{
    status: string
  }> => {
    const { status } = await subscribeEmailToNewsletterRepository(email)
    return {
      status,
    }
  }
}
