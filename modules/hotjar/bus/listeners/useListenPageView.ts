import PageView from '#ioc/bus/events/PageView'

export default () => {
  return ({ product }: PageView) => {
    console.log(['HOTJAR emit'])
  }
}
