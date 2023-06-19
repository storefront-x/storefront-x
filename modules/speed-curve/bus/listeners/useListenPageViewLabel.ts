import PageViewLabel from '#ioc/bus/events/PageViewLabel'

export default () => {
  return (label: PageViewLabel) => {
    // @ts-ignore
    window.LUX.label = label

    // @ts-ignore
    window.LUX.markLoadTime()
  }
}
