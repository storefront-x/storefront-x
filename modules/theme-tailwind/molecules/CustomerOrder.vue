<template>
  <div>
    <div
      class="bg-gray-50 rounded-lg py-2 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-2 lg:space-x-4"
    >
      <dl class="flex flex-col md:flex-row gap-8">
        <div class="flex justify-between sm:block">
          <dt class="font-medium text-gray-900">{{ t('Date placed') }}</dt>
          <dd class="sm:mt-1">
            <time :datetime="new Date(customerOrder.orderDate).toISOString()">{{ d(customerOrder.orderDate) }}</time>
          </dd>
        </div>

        <div class="flex justify-between pt-6 sm:block sm:pt-0">
          <dt class="font-medium text-gray-900">{{ t('Order number') }}</dt>
          <dd class="sm:mt-1">{{ customerOrder.orderNumber }}</dd>
        </div>

        <div class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
          <dt>{{ t('Total amount') }}</dt>
          <SfxMoney el="dd" :money="customerOrder.grandTotal" class="sm:mt-1" />
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import injectCustomerOrder from '#ioc/composables/injectCustomerOrder'
import useI18n from '#ioc/composables/useI18n'

const { t, d } = useI18n()
const customerOrder = injectCustomerOrder()
</script>

<i18n lang="yaml">
cs-CZ:
  Date placed: Objednáno dne
  Order number: Číslo objednávky
  Total amount: Celková částka
</i18n>
