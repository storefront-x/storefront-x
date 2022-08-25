<template>
  <tr>
    <td class="py-6 pr-8">
      <div class="font-medium text-gray-900">{{ customerOrderItem.productName }}</div>
      <SfxMoney el="div" :money="customerOrderItem.productSalePrice" class="mt-1 sm:hidden" />
    </td>
    <SfxMoney el="td" :money="customerOrderItem.productSalePrice" class="hidden py-6 pr-8 sm:table-cell" />
    <td class="hidden py-6 pr-8 sm:table-cell">
      {{ customerOrderItem.quantityOrdered }}
    </td>
    <td class="py-6 font-medium text-right whitespace-nowrap">
      <Link :to="customerOrderItem.productUrlPath">
        {{ t('View') }}
      </Link>
    </td>
  </tr>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import SfxMoney from '#ioc/components/SfxMoney'
import Link from '#ioc/atoms/Link'
import { PropType } from 'vue'
import useOrderItem from '#ioc/composables/useOrderItem'

const { t } = useI18n()

defineProps({
  customerOrderItem: {
    type: Object as PropType<ReturnType<typeof useOrderItem>>,
    default: () => ({}),
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  View: Zobrazit
</i18n>
