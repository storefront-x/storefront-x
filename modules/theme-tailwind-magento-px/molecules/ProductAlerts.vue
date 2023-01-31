<template>
  <button
    class="rounded-md flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
    @click="onNew"
  >
    <OutlineBellRinging class="ml-2 mr-1 text-gray-400" /> {{ t('Alert') }}
    <ProductAlertModal v-if="modalOpen" @close="onClose" />
  </button>
</template>

<script setup lang="ts">
import OutlineBellRinging from '#ioc/icons/OutlineBellRinging'
import useI18n from '#ioc/composables/useI18n'
import ProductAlertModal from '#ioc/molecules/ProductAlertModal'
import { ref } from 'vue'

const { t } = useI18n()

const modalOpen = ref(false)

const onClose = () => {
  modalOpen.value = false
}

const onNew = () => {
  modalOpen.value = true
}
</script>
