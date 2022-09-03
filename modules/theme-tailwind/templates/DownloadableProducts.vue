<template>
  <div>
    <Heading :level="2">{{ t('Downloadable products') }}</Heading>
    <p class="mt-2 text-sm text-gray-500">
      {{ t('subtitle') }}
    </p>

    <Table class="mt-4">
      <Thead>
        <Tr>
          <Th>
            {{ t('Order') }}
          </Th>
          <Th>
            {{ t('Date') }}
          </Th>
          <Th>
            {{ t('Name') }}
          </Th>
          <Th>
            {{ t('Status') }}
          </Th>
          <Th>
            {{ t('Downloads') }}
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr v-for="product in customerDownloadableProducts" :key="product.orderIncrementId">
          <Td>
            {{ product.orderIncrementId }}
          </Td>
          <Td>
            {{ d(product.date) }}
          </Td>
          <Td> Test downloadable product </Td>
          <Td>
            {{ product.status }}
          </Td>
          <Td>
            {{ product.remainingDownloads }}
          </Td>
        </Tr>
      </Tbody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import Heading from '#ioc/atoms/Heading'
import Table from '#ioc/atoms/Table'
import Thead from '#ioc/atoms/Thead'
import Tbody from '#ioc/atoms/Tbody'
import Tr from '#ioc/atoms/Tr'
import Th from '#ioc/atoms/Th'
import Td from '#ioc/atoms/Td'
import ToCustomerDownloadableProduct from '#ioc/mappers/ToCustomerDownloadableProduct'
import { PropType } from 'vue'

const { t, d } = useI18n()

defineProps({
  customerDownloadableProducts: {
    type: Array as PropType<ReturnType<typeof ToCustomerDownloadableProduct>[]>,
    default: () => [],
  },
})
</script>

<i18n lang="yaml">
en-US:
  subtitle: Here are your downlodaable products
cs-CZ:
  Downloadable products: Stahovatelné produkty
  subtitle: Zde jsou Vaše stahovatelné produkty.
  Order: Objednávka
  Date: Datum
  Name: Název
  Status: Stav
  Downloads: Zbývající stažení
</i18n>
