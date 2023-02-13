import useConfirmSubscribeEmailToNewsletterRepository from '#ioc/repositories/useConfirmSubscribeEmailToNewsletterRepository'

interface Options {
  id: string
  code: string
}

export default () => {
  const confirmSubscribeEmailToNewsletterRepository = useConfirmSubscribeEmailToNewsletterRepository()

  return async (
    options: Options,
  ): Promise<{
    status: string
  }> => {
    const { status } = await confirmSubscribeEmailToNewsletterRepository({ id: options.id, code: options.code })
    return {
      status,
    }
  }
}
