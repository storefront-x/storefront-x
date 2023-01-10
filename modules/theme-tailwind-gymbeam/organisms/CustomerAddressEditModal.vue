<template>
  <Modal @close="emit('close')">
    <Heading :level="3">{{ t(customerAddress ? 'Edit address' : 'New address') }}</Heading>

    <SfxForm :value="customerAddress" @submit="onSubmit">
      <FormInput
        :label="t('First name')"
        name="firstName"
        autocomplete="given-name"
        class="mt-4"
        validators="required"
      />

      <FormInput
        :label="t('Last name')"
        name="lastName"
        autocomplete="family-name"
        class="mt-4"
        validators="required"
      />

      <FormInput :label="t('Telephone')" name="phoneNumber" autocomplete="tel" class="mt-4" validators="required" />

      <FormInput :label="t('Street')" name="street" autocomplete="street-address" class="mt-4" validators="required" />

      <FormInput :label="t('City')" name="city" autocomplete="address-level2" class="mt-4" validators="required" />

      <FormInput :label="t('Postcode')" name="zipcode" autocomplete="postal-code" class="mt-4" validators="required" />

      <FormSelect
        v-model="selectedCountry"
        :label="t('Country')"
        name="countryCode"
        autocomplete="address-level2"
        class="mt-4"
        validators="required"
      >
        <option value="">{{ t('Select a country') }}</option>
        <option v-for="country in countries" :key="country.id" :value="country.id">
          {{ country.fullNameEnglish }}
        </option>
      </FormSelect>

      <FormSelect
        v-if="regionsForSelectedCountry.length > 0"
        :label="t('Region')"
        name="regionId"
        autocomplete="address-level2"
        class="mt-4"
        validators="required"
      >
        <option value="">{{ t('Select a region') }}</option>
        <option v-for="region in regionsForSelectedCountry" :key="region.id" :value="region.id">
          {{ region.name }}
        </option>
      </FormSelect>

      <div class="flex justify-end gap-4 mt-4">
        <Button v-if="customerAddress" type="button" color="error" outline @click="onDelete">{{ t('Delete') }}</Button>
        <Button type="submit" color="primary" data-cy="save">{{ t('Save') }}</Button>
      </div>
    </SfxForm>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '#ioc/atoms/Modal'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import FormInput from '#ioc/molecules/FormInput'
import FormSelect from '#ioc/molecules/FormSelect'
import useI18n from '#ioc/composables/useI18n'
import SfxForm from '#ioc/components/SfxForm'
import { computed, PropType, ref } from 'vue'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'
import useGetAvailableCountries from '#ioc/services/useGetAvailableCountries'

const { t } = useI18n()
const getAvailableCountries = useGetAvailableCountries()

const props = defineProps({
  customerAddress: {
    type: Object as PropType<ReturnType<typeof ToCustomerAddress>>,
    default: null,
  },
})

const emit = defineEmits(['update', 'create', 'delete', 'close'])

const { countryList: countries } = await getAvailableCountries()
const selectedCountry = ref(props.customerAddress?.countryCode ?? '')

const regionsForSelectedCountry = computed(() => {
  return (
    countries?.find((country: any) => {
      return country.id === selectedCountry.value
    })?.availableRegions ?? []
  )
})

const onSubmit = (data: any) => {
  if (props.customerAddress) {
    emit('update', { id: props.customerAddress.id, postcode: data.zipcode, telephone: data.phoneNumber, ...data })
  } else {
    emit('create', { postcode: data.zipcode, telephone: data.phoneNumber, ...data })
  }
}

const onDelete = () => {
  emit('delete', props.customerAddress)
}
</script>

<i18n lang="yaml">
cs-CZ:
  Edit address: Upravit adresu
  New address: Nová adresa
  First name: Křestní jméno
  Last name: Příjmení
  Telephone: Telefon
  Street: Ulice
  City: Město
  Postcode: PSČ
  Save: Uložit
  Choose a country: Vyberte zemi
  Select a region: Vyberte region
</i18n>
