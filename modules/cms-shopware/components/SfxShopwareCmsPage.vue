<script lang="ts">
import { defineComponent, h } from 'vue'
import shopwareCmsBlocks from '~/.sfx/shopware/cms/blocks'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    renderBlock(group: any) {
      const component = this.component(group.type)
      if (!component) return null

      const slots: any = {}

      for (const slot of group.slots ?? []) {
        const slotName = slot.slot === 'content' ? 'default' : slot.slot || 'default'

        slots[slotName] = () => this.renderBlock(slot)
      }

      return h(component, { data: group, section: group.section }, slots)
    },

    component(type: string) {
      const component = shopwareCmsBlocks[type as keyof typeof shopwareCmsBlocks]
      if (!component) {
        console.warn(`Unknown block type: ${type}`)
        return null
      }

      return component
    },
  },

  render() {
    const renderedBlock: any = []

    for (const section of this.data.sections) {
      for (const block of section.blocks) {
        renderedBlock.push(this.renderBlock({ ...block, section }))
      }
    }

    return renderedBlock
  },
})
</script>

<style>
hr {
  max-width: 160px;
  margin: 0 auto;
}
</style>
