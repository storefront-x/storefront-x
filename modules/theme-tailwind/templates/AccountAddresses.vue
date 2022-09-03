<template>
  <Heading :level="2">{{ t('Addresses') }}</Heading>
  <p class="mt-2 text-sm text-gray-500">
    {{ t('subtitle') }}
  </p>
  <CustomerAddresses :customer-addresses="addresses ?? []" @refresh="refresh" />
</template>

<script setup lang="ts">
import CustomerAddresses from '#ioc/organisms/CustomerAddresses'
import useI18n from '#ioc/composables/useI18n'
import Heading from '#ioc/atoms/Heading'
import { PropType } from 'vue'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'

const { t } = useI18n()

const emit = defineEmits(['refresh'])

const refresh = () => {
  emit('refresh')
}

defineProps({
  addresses: {
    type: Array as PropType<ReturnType<typeof ToCustomerAddress>[]>,
    default: () => [],
  },
})
</script>

<i18n lang="yaml">
en-US:
  subtitle: Here, you can add/edit/remove your shipping and billing addresses.
cs-CZ:
  Addresses: Adresy
  subtitle: Zde můžete přidat/upravit/odebrat Vaše adresy.
</i18n>
