import IS_SERVER from '#ioc/config/IS_SERVER'

export default (base64data: any) => {
  if (IS_SERVER) {
    const buffer = Buffer.from(base64data, 'base64')

    return buffer.toString('utf8')
  } else {
    return window.atob(base64data)
  }
}
