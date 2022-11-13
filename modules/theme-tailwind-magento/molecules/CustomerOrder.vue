<template>
  <div>
    <div
      class="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8"
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

        <div class="flex justify-between pt-6 sm:block sm:pt-0">
          <dt class="font-medium text-gray-900">{{ t('Order status') }}</dt>
          <dd :class="orderStatus" class="sm:mt-1">{{ customerOrder.status }}</dd>
        </div>

        <div class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
          <Button :loading="isReorderLoading" :disabled="isReorderLoading" @click="onReorderItems">
            {{ t('Reorder items') }}
          </Button>
        </div>
      </dl>
    </div>
  </div>
  <table class="mt-4 w-full text-gray-500 sm:mt-6">
    <thead class="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
      <tr>
        <th scope="col" class="sm:w-1/2 lg:w-3/5 pr-8 py-3 font-normal">{{ t('Product') }}</th>
        <th scope="col" class="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">{{ t('Price') }}</th>
        <th scope="col" class="hidden pr-8 py-3 font-normal sm:table-cell">{{ t('Quantity') }}</th>
        <th scope="col" class="w-0 py-3 font-normal text-right">{{ t('Info') }}</th>
      </tr>
    </thead>
    <tbody class="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
      <CustomerOrderItem
        v-for="customerOrderItem in customerOrder.items"
        :key="customerOrderItem.id"
        :customer-order-item="useOrderItem(customerOrderItem)"
      />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import Button from '#ioc/atoms/Button'
import injectCustomerOrder from '#ioc/composables/injectCustomerOrder'
import useI18n from '#ioc/composables/useI18n'
import { computed, ref } from 'vue'
import useOrderItem from '#ioc/composables/useOrderItem'
import CustomerOrderItem from '#ioc/molecules/CustomerOrderItem'
import useReorderItems from '#ioc/services/useReorderItems'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useRouter from '#ioc/composables/useRouter'
import useLocalePath from '#ioc/composables/useLocalePath'

const { t, d } = useI18n()
const customerOrder = injectCustomerOrder()

const localePath = useLocalePath()

const router = useRouter()

const isReorderLoading = ref(false)

const showErrorNotification = useShowErrorNotification()

const reorderItems = useReorderItems()

const onReorderItems = async () => {
  try {
    isReorderLoading.value = true
    await reorderItems(customerOrder.orderNumber)
    router.push(localePath('checkout'))
  } catch (e) {
    showErrorNotification(e)
  } finally {
    isReorderLoading.value = false
  }
}

const orderStatus = computed(() => {
  return {
    'text-green-600': customerOrder.status === 'Complete',
    'text-red-600': customerOrder.status === 'Canceled',
  }
})
</script>

<i18n lang="yaml">
cs-CZ:
  Date placed: Objednáno dne
  Order number: Číslo objednávky
  Total amount: Celková částka
  Product: Produkt
  Price: Cena
  Quantity: Kusů
  Info: Info
  Reorder items: Znovu objednat
  Items added to cart: Položky přidány do košíku
</i18n>
