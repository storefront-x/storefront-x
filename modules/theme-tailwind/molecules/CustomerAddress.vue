<template>
  <Tr>
    <Td>{{ customerAddress.firstName }}</Td>
    <Td>{{ customerAddress.lastName }}</Td>
    <Td>{{ customerAddress.phoneNumber }}</Td>
    <Td>{{ customerAddress.street }}</Td>
    <Td>{{ customerAddress.city }}</Td>
    <Td>{{ customerAddress.zipcode }}</Td>
    <Td>
      <Button @click="onEdit">{{ t('Edit') }}</Button>
    </Td>
  </Tr>
</template>

<script>
import Tr from '#ioc/atoms/Tr'
import Td from '#ioc/atoms/Td'
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Tr,
    Td,
    Button,
  },

  props: {
    customerAddress: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['edit'],

  setup() {
    const { t } = useI18n()
    return { t }
  },
  methods: {
    onEdit() {
      this.$emit('edit', this.customerAddress)
    },
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Edit: Upravit
</i18n>
