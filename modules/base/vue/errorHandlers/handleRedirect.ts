import Redirect from '#ioc/errors/Redirect'

export default () => {
  return (error: any) => {
    if (error instanceof Redirect) {
      window.location.href = error.url
    } else {
      throw error
    }
  }
}
