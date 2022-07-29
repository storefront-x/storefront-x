<template>
  <Heading :level="2">{{ t('Contact information') }}</Heading>
  <SfxForm ref="form" class="mt-4" @input="onInput">
    <div class="grid grid-cols-1 gap-4 mb-4">
      <FormInput name="email" autocomplete="email" :label="t('Email')" validators="required" />
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <FormInput name="firstName" autocomplete="given-name" :label="t('First name')" validators="required" />
      <FormInput name="lastName" autocomplete="family-name" :label="t('Last name')" validators="required" />
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <FormInput name="city" autocomplete="address-level2" :label="t('City')" validators="required" />
      <FormInput name="zipcode" autocomplete="postal-code" :label="t('Zipcode')" validators="required" />
    </div>

    <div class="grid grid-cols-1 gap-4 mb-4">
      <FormInput name="street" autocomplete="street-address" :label="t('Street')" validators="required" />
    </div>
  </SfxForm>
</template>

<script setup lang="ts">
import SfxForm from '#ioc/components/SfxForm'
import Heading from '#ioc/atoms/Heading'
import FormInput from '#ioc/molecules/FormInput'
import useI18n from '#ioc/composables/useI18n'
import useSetContactInformation from '#ioc/composables/useSetContactInformation'
import { ref } from 'vue'

const { t } = useI18n()
const setContactInformation = useSetContactInformation()

const form = ref()

const onInput = async (data: any) => {
  if (!form.value.isValid) {
    await setContactInformation(null)
  } else {
    await setContactInformation(data)
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Contact information: Kontaktní informace
</i18n>
