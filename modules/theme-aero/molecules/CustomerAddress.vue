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

<script setup lang="ts">
import Tr from '#ioc/atoms/Tr'
import Td from '#ioc/atoms/Td'
import Button from '#ioc/atoms/Button'
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()
const emit = defineEmits(['edit'])

const props = defineProps({
  customerAddress: {
    type: Object,
    default: () => ({}),
  },
})

const onEdit = () => {
  emit('edit', props.customerAddress)
}
</script>

<i18n lang="yaml">
cs-CZ:
  Edit: Upravit
</i18n>
