import DeliveryNotValid from '#ioc/errors/DeliveryNotValid'
export default () => {
  return (error: any) => {
    if (error instanceof DeliveryNotValid) {
      window.location.reload()
    } else {
      throw error
    }
  }
}
