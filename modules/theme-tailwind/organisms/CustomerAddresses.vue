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

<script>
import Button from '#ioc/atoms/Button'
import Table from '#ioc/atoms/Table'
import Thead from '#ioc/atoms/Thead'
import Tbody from '#ioc/atoms/Tbody'
import Tr from '#ioc/atoms/Tr'
import Th from '#ioc/atoms/Th'
import useI18n from '#ioc/composables/useI18n'
import CustomerAddress from '#ioc/molecules/CustomerAddress'
import { defineComponent } from 'vue'
import CustomerAddressEditModal from '#ioc/organisms/CustomerAddressEditModal'
import useCreateCustomerAddress from '#ioc/services/useCreateCustomerAddress'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useUpdateCustomerAddress from '#ioc/services/useUpdateCustomerAddress'
import useDeleteCustomerAddress from '#ioc/services/useDeleteCustomerAddress'

export default defineComponent({
  components: {
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    CustomerAddress,
    CustomerAddressEditModal,
  },

  props: {
    customerAddresses: {
      type: Array,
      default: () => [],
    },
  },

  emits: ['refresh'],

  setup() {
    const createCustomerAddress = useCreateCustomerAddress()
    const deleteCustomerAddress = useDeleteCustomerAddress()
    const showErrorNotification = useShowErrorNotification()
    const updateCustomerAddress = useUpdateCustomerAddress()

    const { t } = useI18n()

    return {
      t,
      createCustomerAddress,
      showErrorNotification,
      updateCustomerAddress,
      deleteCustomerAddress,
    }
  },

  data: () => ({
    customerAddressToEdit: null,
    isCustomerEditModalOpen: false,
  }),

  methods: {
    onNew() {
      this.customerAddressToEdit = null
      this.isCustomerEditModalOpen = true
    },

    onEdit(customerAddress) {
      this.customerAddressToEdit = customerAddress
      this.isCustomerEditModalOpen = true
    },

    onClose() {
      this.customerAddressToEdit = null
      this.isCustomerEditModalOpen = false
    },

    async onUpdate(data) {
      try {
        await this.updateCustomerAddress(data)
        this.$emit('refresh')
        this.onClose()
      } catch (error) {
        this.showErrorNotification(error)
        this.onClose()
      }
    },

    async onCreate(data) {
      try {
        await this.createCustomerAddress(data)
        this.$emit('refresh')
        this.onClose()
      } catch (error) {
        this.showErrorNotification(error)
        this.onClose()
      }
    },

    async onDelete(id) {
      try {
        await this.deleteCustomerAddress(id)
        this.$emit('refresh')
        this.onClose()
        this.onClose()
      } catch (error) {
        this.$emit('refresh')
        this.showErrorNotification(error)
        this.onClose()
      }
    },
  },
})
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
