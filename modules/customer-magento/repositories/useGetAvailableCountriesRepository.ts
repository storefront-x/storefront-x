import Countries from '#ioc/graphql/queries/Countries'
import useMagento from '#ioc/composables/useMagento'
import useToCountry from '#ioc/mappers/useToCountry'

export default () => {
  const magento = useMagento()
  const toCountry = useToCountry()

  return async (): Promise<{
    countryList: ReturnType<typeof toCountry>[]
  }> => {
    const { data, _error } = await magento.graphql(Countries())

    if (_error) {
      throw new Error(_error)
    }

    return {
      countryList: data?.countries?.map(toCountry) ?? [],
    }
  }
}
