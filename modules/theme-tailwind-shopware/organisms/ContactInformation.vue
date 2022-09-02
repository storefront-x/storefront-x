<template>
  <Heading :level="2">{{ t('Contact information') }}</Heading>
  <SfxForm ref="form" class="mt-4" @input="onInput">
    <div class="grid grid-cols-1 gap-4 mb-4">
      <FormInput name="email" autocomplete="email" :label="t('Email')" validators="required" />
    </div>

    <div class="grid grid-cols-3 gap-4 mb-4">
      <FormSelect :label="t('Salutation')" name="salutation" validators="required">
        <option selected disabled :value="null" />
        <option v-for="salutation in salutationsData?.salutations" :key="salutation.id" :value="salutation">
          {{ salutation.displayName }}
        </option>
      </FormSelect>

      <FormInput name="firstName" autocomplete="given-name" :label="t('First name')" validators="required" />

      <FormInput name="lastName" autocomplete="family-name" :label="t('Last name')" validators="required" />
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <FormInput name="city" autocomplete="address-level2" :label="t('City')" validators="required" />

      <FormInput name="zipcode" autocomplete="postal-code" :label="t('Zipcode')" validators="required" />
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <FormInput name="street" autocomplete="street-address" :label="t('Street')" validators="required" />

      <FormSelect :label="t('Country')" name="country" autocomplete="address-level2" validators="required">
        <option selected disabled :value="null" />
        <option v-for="country in countriesData?.countries" :key="country.id" :value="country">
          {{ country.name }}
        </option>
      </FormSelect>
    </div>
  </SfxForm>
</template>

<script setup lang="ts">
import SfxForm from '#ioc/components/SfxForm'
import Heading from '#ioc/atoms/Heading'
import FormInput from '#ioc/molecules/FormInput'
import FormSelect from '#ioc/molecules/FormSelect'
import useI18n from '#ioc/composables/useI18n'
import useConfirmContactInformation from '#ioc/services/useConfirmContactInformation'
import useGetCountries from '#ioc/services/useGetCountries'
import useGetSalutations from '#ioc/services/useGetSalutations'
import useAsyncData from '#ioc/composables/useAsyncData'
import { ref } from 'vue'

const { t } = useI18n()
const confirmContactInformation = useConfirmContactInformation()
const getSalutations = useGetSalutations()
const getCountries = useGetCountries()

const { data: salutationsData } = useAsyncData('salutations', () => getSalutations())
const { data: countriesData } = useAsyncData('countries', () => getCountries())

const form = ref()

const onInput = async (data: any) => {
  if (!form.value.isValid) {
    await confirmContactInformation(null)
  } else {
    await confirmContactInformation(data)
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Contact information: Kontaktní informace
</i18n>
