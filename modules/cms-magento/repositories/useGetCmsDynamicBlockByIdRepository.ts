import useMagento from '#ioc/composables/useMagento'
import CmsDynamicBlock from '#ioc/graphql/queries/CmsDynamicBlock'
import ToCmsDynamicBlock from '#ioc/mappers/ToCmsDynamicBlock'

export default () => {
  const magento = useMagento()

  return async (
    identifier: string,
  ): Promise<{
    cmsDynamicBlock: ReturnType<typeof ToCmsDynamicBlock>
  }> => {
    enum type {
      SPECIFIED,
    }
    const identifiers = []
    identifiers.push(identifier)

    const { data } = await magento.graphql(
      CmsDynamicBlock().with({
        input: {
          dynamic_block_uids: identifiers,
          type: type[type.SPECIFIED],
        },
      }),
    )

    return {
      cmsDynamicBlock: ToCmsDynamicBlock(data.dynamicBlocks.items[0]),
    }
  }
}
