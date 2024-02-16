import useMagentoStore from '#ioc/stores/useMagentoStore'

export default () => {
  console.log('usingMag')
  const magentoStore = useMagentoStore()
  return { graphql: magentoStore.graphql }
}
