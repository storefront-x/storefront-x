// @ts-nocheck
export default () => {
  return (label: string) => {
    if (!window && !window.LUX) {
      return
    }

    window.LUX.label = label

    window.LUX.markLoadTime()
  }
}
