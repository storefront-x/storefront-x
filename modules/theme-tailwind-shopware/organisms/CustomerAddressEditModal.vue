<template>
  <Modal @close="$emit('close')">
    <Heading :level="3">{{ t(customerAddress ? 'Edit address' : 'New address') }}</Heading>

    <SfxForm :value="customerAddress" @submit="onSubmit">
      <FormSelect
        :label="t('Salutation')"
        name="salutationId"
        autocomplete="address-level2"
        class="mt-4"
        validators="required"
      >
        <option v-for="salutation in salutationData?.salutations" :key="salutation.id" :value="salutation.id">
          {{ salutation.displayName }}
        </option>
      </FormSelect>

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
        :label="t('Country')"
        name="countryId"
        autocomplete="address-level2"
        class="mt-4"
        validators="required"
      >
        <option value="">{{ t('Select a country') }}</option>
        <option v-for="country in countryData?.countries" :key="country.id" :value="country.id">
          {{ country.name }}
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
import useGetCountries from '#ioc/services/useGetCountries'
import SfxForm from '#ioc/components/SfxForm'
import useGetSalutations from '#ioc/services/useGetSalutations'
import useAsyncData from '#ioc/composables/useAsyncData'

const getCountries = useGetCountries()
const { t } = useI18n()
const getSalutations = useGetSalutations()

const { data: countryData } = useAsyncData('countries', () => getCountries())
const { data: salutationData } = useAsyncData('salutations', () => getSalutations())

const props = defineProps({
  customerAddress: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update', 'create', 'delete', 'close'])

const onSubmit = (data: any) => {
  if (props.customerAddress) {
    emit('update', { id: props.customerAddress.id, ...data })
  } else {
    emit('create', data)
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
