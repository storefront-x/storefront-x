<template>
  <button
    class="rounded-md flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
    @click="onNew"
  >
    <OutlineBellRinging class="ml-2 mr-1 text-gray-400" /> {{ t('Alert') }}
    <ProductAlertModal v-if="modalOpen" @close="onClose" @submit="onSubmit" />
  </button>
</template>

<script setup lang="ts">
import OutlineBellRinging from '#ioc/icons/OutlineBellRinging'
import useI18n from '#ioc/composables/useI18n'
import ProductAlertModal from '#ioc/molecules/productAlerts/ProductAlertModal'
import { ref } from 'vue'
import injectProduct from '#ioc/composables/injectProduct'
import useNotifyInStock from '#ioc/services/productAlerts/useNotifyInStock'
import useNotifyPriceDrops from '#ioc/services/productAlerts/useNotifyPriceDrops'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'

const { t } = useI18n()
const product = injectProduct()
const notifyInStock = useNotifyInStock()
const notifyPriceDrops = useNotifyPriceDrops()
const showSuccessNotification = useShowSuccessNotification()
const showErrorNotification = useShowErrorNotification()

const modalOpen = ref(false)

const onClose = () => {
  modalOpen.value = false
}

const onNew = () => {
  modalOpen.value = true
}

const onSubmit = async (data: any) => {
  try {
    if (data.isAvailable) {
      await notifyInStock(String(product.id))
    }

    if (data.isPriceLower) {
      await notifyPriceDrops(String(product.id))
    }

    modalOpen.value = false
    showSuccessNotification('', t('Tracking successfully set'))
  } catch (e: any) {
    modalOpen.value = false
    showErrorNotification(t('Tracking has not been set'))
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Alert: 'Sledování'
  Tracking successfully set: 'Sledování bylo úspěšně nastaveno'
  Tracking has not been set: 'Sledování nebylo nastaveno'
</i18n>
