<script lang="ts">
import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'
import useStoreStore from '#ioc/stores/useStoreStore'
import ToMoney from '#ioc/mappers/ToMoney'
import { computed, defineComponent, h, PropType } from 'vue'
import formatters from '~/.sfx/formatters/money'

export default defineComponent({
  props: {
    money: {
      type: Object as PropType<ReturnType<typeof ToMoney>>,
      default: null,
    },
    el: {
      type: String,
      default: 'span',
    },
    negate: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'default',
    },
  },

  setup(props) {
    const storeStore = useStoreStore()

    const value = computed((): number => {
      return props.money?.value
    })

    const currency = computed((): string => {
      return props.money?.currency ?? storeStore.currency?.code
    })

    const html = computed((): string => {
      if (!props.money) return ''

      //@ts-ignore
      const currencyFormatters = formatters[currency.value]
      if (!currencyFormatters) return ''

      const formatter = currencyFormatters[props.variant] || currencyFormatters.default
      if (!formatter) return ''

      const prefix = props.negate ? '-' : ''

      return prefix + formatter.call(this, value.value / PRICE_OFFSET)
    })

    return {
      html,
    }
  },

  render() {
    if (this.$slots.default) return this.$slots.default(this)

    return h(this.el, { innerHTML: this.html })
  },
})
</script>
