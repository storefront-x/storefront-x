import useRequestPasswordResetEmailRepository from '#ioc/repositories/useRequestPasswordResetEmailRepository'

export default () => {
  const requestPasswordResetEmailRepository = useRequestPasswordResetEmailRepository()

  return async (...args: Parameters<typeof requestPasswordResetEmailRepository>) => {
    return await requestPasswordResetEmailRepository(...args)
  }
}
