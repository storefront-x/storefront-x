import useMagentoStore from '#ioc/stores/useMagentoStore'

export default () => {
  const magentoStore = useMagentoStore()

  return {
    graphql: magentoStore.graphql,
  }
}
