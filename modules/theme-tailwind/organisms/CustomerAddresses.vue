<template>
  <div>
    <Table>
      <Thead>
        <Tr>
          <Th>{{ t('First name') }}</Th>
          <Th>{{ t('Last name') }}</Th>
          <Th>{{ t('Telephone') }}</Th>
          <Th>{{ t('Street') }}</Th>
          <Th>{{ t('City') }}</Th>
          <Th>{{ t('Postcode') }}</Th>
          <Th />
        </Tr>
      </Thead>

      <Tbody>
        <CustomerAddress
          v-for="customerAddress in customerAddresses"
          :key="customerAddress.id"
          :customer-address="customerAddress"
          @edit="onEdit"
        />
      </Tbody>
    </Table>

    <Button color="primary" class="mt-4" data-cy="new-address" @click="onNew">{{ t('New address') }}</Button>

    <CustomerAddressEditModal
      v-if="isCustomerEditModalOpen"
      :customer-address="customerAddressToEdit"
      @close="onClose"
      @update="onUpdate"
      @create="onCreate"
      @delete="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import Table from '#ioc/atoms/Table'
import Thead from '#ioc/atoms/Thead'
import Tbody from '#ioc/atoms/Tbody'
import Tr from '#ioc/atoms/Tr'
import Th from '#ioc/atoms/Th'
import useI18n from '#ioc/composables/useI18n'
import CustomerAddress from '#ioc/molecules/CustomerAddress'
import { PropType, ref } from 'vue'
import CustomerAddressEditModal from '#ioc/organisms/CustomerAddressEditModal'
import useCreateCustomerAddress from '#ioc/services/useCreateCustomerAddress'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useUpdateCustomerAddress from '#ioc/services/useUpdateCustomerAddress'
import useDeleteCustomerAddress from '#ioc/services/useDeleteCustomerAddress'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'

const emit = defineEmits(['refresh'])

const { t } = useI18n()
const createCustomerAddress = useCreateCustomerAddress()
const deleteCustomerAddress = useDeleteCustomerAddress()
const showErrorNotification = useShowErrorNotification()
const updateCustomerAddress = useUpdateCustomerAddress()

defineProps({
  customerAddresses: {
    type: Array as PropType<ReturnType<typeof ToCustomerAddress>[]>,
    default: () => [],
  },
})

const customerAddressToEdit = ref<ReturnType<typeof ToCustomerAddress>>()
const isCustomerEditModalOpen = ref(false)

const onNew = () => {
  customerAddressToEdit.value = undefined
  isCustomerEditModalOpen.value = true
}

const onEdit = (customerAddress: ReturnType<typeof ToCustomerAddress>) => {
  customerAddressToEdit.value = customerAddress
  isCustomerEditModalOpen.value = true
}

const onClose = () => {
  customerAddressToEdit.value = undefined
  isCustomerEditModalOpen.value = false
}

const onUpdate = async (customerAddress: ReturnType<typeof ToCustomerAddress>) => {
  try {
    await updateCustomerAddress(customerAddress)
    emit('refresh')
    onClose()
  } catch (error) {
    showErrorNotification(error)
    onClose()
  }
}

const onCreate = async (customerAddress: ReturnType<typeof ToCustomerAddress>) => {
  try {
    await createCustomerAddress(customerAddress)
    emit('refresh')
    onClose()
  } catch (error) {
    showErrorNotification(error)
    onClose()
  }
}

const onDelete = async (customerAddress: ReturnType<typeof ToCustomerAddress>) => {
  try {
    await deleteCustomerAddress(customerAddress)
    emit('refresh')
    onClose()
  } catch (error) {
    emit('refresh')
    showErrorNotification(error)
    onClose()
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  New address: Nová adresa
  First name: Křestní jméno
  Last name: Příjmení
  Telephone: Telefon
  Street: Ulice
  City: Město
  Postcode: PSČ
</i18n>
