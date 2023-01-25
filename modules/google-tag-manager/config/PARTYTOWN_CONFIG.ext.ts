export default (self: any) => {
  return () => {
    const partytown = self()
    partytown.add('dataLayer.push')

    return partytown
  }
}
