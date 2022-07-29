import IS_SERVER from '#ioc/config/IS_SERVER'

export default (data: any) => {
  if (IS_SERVER) {
    const buffer = Buffer.from(data)

    return buffer.toString('base64')
  } else {
    return window.btoa(data)
  }
}
