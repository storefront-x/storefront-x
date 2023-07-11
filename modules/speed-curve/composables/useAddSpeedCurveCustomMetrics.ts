// @ts-nocheck
export default () => {
  return (name: string, value: any) => {
    if (!window && !window.LUX) {
      return
    }

    window.LUX.addData(name, value)
  }
}
