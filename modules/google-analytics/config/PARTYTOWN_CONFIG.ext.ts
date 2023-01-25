export default (self: any) => {
  return () => {
    const partytown = self()
    partytown.add('gtag')

    return partytown
  }
}
